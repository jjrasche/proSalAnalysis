import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ProSalData } from '../models/pro-sal-data.model'
import { Domain } from '../models/domain.model'
import { ChartService } from '../services/chart.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ProSalForm, DefaultProSalForm } from '../models/pro-sal-form.model';
import { SavedFormService } from '../services/saved-form.service';
declare let google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  lineChartData: Object;
  formGroup: FormGroup;
  updatingChart = false;
  private stepSize = 500;
  private calculatedDomain: Domain = { min: 0, max: 1500000 };
  private xAxis: Domain = {min: 120000, max: 720000};
  lossPoint: number;
  gainPoint: number;
  debouncedInput: KeyboardEvent;
  formList: Array<string>;
  initialSelectedForm: string;

  public get costToProductionLossPercent(): number {
    return this.formGroup.get('unfairHigh').value / 100;
  }

  constructor(public fb: FormBuilder,
              public chartService: ChartService,
              private localStorageService: LocalStorageService,
              private savedFormService: SavedFormService) {
  }

  ngOnInit(): void {
    this.formGroup = this.savedFormService.getSelectedFormFromLocalStorage();
    this.initialSelectedForm = this.localStorageService.getSelectedForm();
    const forms = this.localStorageService.getFormsFromLocalStorage();
    this.formList = Object.keys(forms);

    console.log(`initial
    selected from: ${this.initialSelectedForm}
    form list: ${JSON.stringify(this.formList)}
    `);

    this.formGroup.get('stopLoss').valueChanges.pipe()
      .subscribe((stopLoss: boolean) => {
        this.drawChart();
        if (stopLoss) {
          this.formGroup.get('basePay').disable();
        } else {
          this.formGroup.get('basePay').enable();
        }
      });

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart() {
    if (this.formGroup.errors) {
      return;
    }
    if (this.updatingChart) {
      return;
    }

    this.localStorageService.safeAddFormToLocalStorage(this.formGroup.value);

    this.updatingChart = true;
    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn('number', 'Production');
    dataTable.addColumn('number', 'Cost/Production');
    // A column for custom tooltip content
    dataTable.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
    dataTable.addColumn({ type: 'string', role: 'style' });

    dataTable.addRows(this.googleCreateProductionData());

    let options = {
      tooltip: { isHtml: true },
      legend: 'none',
      chartArea: { 'left': 20, 'bottom': 20, 'right': 5, 'top': 5 },
      explorer: {
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomIn: 4.0
      },
    };
    let chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(dataTable, options);
    this.updatingChart = false;
  }

  googleCreateProductionData(): Array<Array<any>> {
    const proSalData = new Array<ProSalData>();
    let xVal = this.calculatedDomain.min;
    while (xVal <= this.calculatedDomain.max) {
      proSalData.push(this.proSalFunction(xVal));
      xVal += this.stepSize;
    }

    // set gain and loss points
    const lossDataPoint = this.chartService.closest(proSalData, 'costToProduction', 25);
    this.lossPoint = lossDataPoint == null ? null : lossDataPoint.production;
    const gainDataPoint = this.chartService.closest(proSalData, 'totalPay', this.formGroup.get('desiredSalary').value);
    this.gainPoint = gainDataPoint == null ? null : gainDataPoint.production;

    const ret = new Array<Array<any>>();
    proSalData
      .filter((psd: ProSalData) => this.xAxis.min < psd.production && psd.production < this.xAxis.max)
      .forEach((psd: ProSalData) => {
        ret.push([psd.production, psd.costToProduction, this.chartService.createToolTipString(psd), this.psdToColor(psd)]);
      });

    return ret;
  }

  proSalFunction(production: number): ProSalData {
    const basePay = this.formGroup.get('basePay').value;
    const percentProduction = this.chartService.toPercent(this.formGroup.get('percentProduction').value);
    const staticCosts = this.formGroup.get('staticCosts').value;
    const payAdjustedCostPercent = this.chartService.toPercent(this.formGroup.get('payAdjustedCostPercent').value);

    const productionPay = production * percentProduction;
    const additionalProductionPay =
      productionPay - basePay > 0 ?
        productionPay - basePay : 0;

    let totalPay = 0;
    let totalCost = 0;
    let costToProduction = 0;
    if (this.formGroup.get('stopLoss').value) {
      totalPay = basePay + additionalProductionPay;
      totalCost = staticCosts + payAdjustedCostPercent * totalPay + totalPay;
      costToProduction = totalCost / production;

      // determine totalPay based on costToProductionLossPercent
      if (costToProduction > this.costToProductionLossPercent) {
        totalPay = (this.costToProductionLossPercent * production - staticCosts) / (payAdjustedCostPercent + 1);
        totalCost = staticCosts + payAdjustedCostPercent * totalPay + totalPay;
        costToProduction = totalCost / production;
      }
    } else {
      totalPay = basePay + additionalProductionPay;
      totalCost = staticCosts + payAdjustedCostPercent * totalPay + totalPay;
      costToProduction = totalCost / production;
    }

    return {
      production: this.chartService.trunc(production),
      totalPay: this.chartService.trunc(totalPay),
      totalCost: this.chartService.trunc(totalCost),
      costToProduction: this.chartService.trunc(this.chartService.fromPercent(costToProduction))
    };
  }

  psdToColor(proSalData: ProSalData) {
    const opacity = proSalData.totalPay <= this.formGroup.get('desiredSalary').value ? .2 : 1;

    if (proSalData.costToProduction > this.formGroup.get('unfairHigh').value) {
      return `color: red; opacity: ${opacity};`;
    } else if (proSalData.costToProduction > this.formGroup.get('fairHigh').value) {
      return `color: yellow; opacity: ${opacity};`;
    } else if (proSalData.costToProduction > this.formGroup.get('fairLow').value) {
      return `color: green; opacity: ${opacity};`;
    } else if (proSalData.costToProduction > this.formGroup.get('unfairLow').value) {
      return `color: yellow; opacity: ${opacity};`;
    }
    return `color: red; opacity: ${opacity};`;
  }


  onEnter(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      if (this.debouncedInput &&  this.debouncedInput.timeStamp == event.timeStamp) {
        // console.log("throwing away one.")
        return;
      }
      this.debouncedInput = event;
      this.drawChart();
      return false;
    }
  }

  saveForm() {
    this.localStorageService.addFormToLocalStorage(this.formGroup.getRawValue());
  }

  removeForm() {
    this.localStorageService.removeFormFromLocalStorage();
  }

  /**
   * - save selection to local storage
   * - import saved form information if selection is valid
   * - redraw chart with new information
   */
  itemSelected(formName: string) {
    this.localStorageService.setSelectedForm(formName);

    // if removed the selected form, then maintain the formGroup values.
    if (formName != null) {
      const formValue = this.savedFormService.getSelectedFormFromLocalStorage();
      if (formValue) {
        this.formGroup = formValue;
      }
      this.drawChart();
    }
  }
}
