import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ProSalData } from "../models/pro-sal-data.model"
import { Domain } from "../models/domain.model"
import { ChartService } from '../services/chart.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ProSalForm, DefaultProSalForm } from '../models/pro-sal-form.model';
declare let google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  t = DefaultProSalForm;
  lineChartData: Object;
  formGroup: FormGroup;
  updatingChart: boolean = false;
  private stepSize = 500;
  private calculatedDomain: Domain = { min: 0, max: 1500000 };
  private xAxis: Domain = {min:120000, max:720000};
  lossPoint: number;
  gainPoint: number;
  debouncedInput: KeyboardEvent;
  
  public get costToProductionLossPercent() : number {
    return this.formGroup.get("unfairHigh").value / 100;
  }
  
  constructor(public fb: FormBuilder,
              public chartService: ChartService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    let storedForm = this.localStorageService.getFormFromLocalStorage();
    if (storedForm == null) {
      this.formGroup = this.convertProSalToForm();
    } else {
      this.formGroup = this.convertProSalToForm(storedForm);
    }
    this.formGroup.get("stopLoss").valueChanges.pipe()
      .subscribe((stopLoss: boolean) => {
        this.drawChart();
        if (stopLoss) {
          this.formGroup.get("basePay").disable();
        } else {
          this.formGroup.get("basePay").enable();
        }
      });

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart(where:string = "onload") {
    if(this.formGroup.errors) {
      return;
    }
    if (this.updatingChart) {
      return;
    }

    this.localStorageService.saveFormToLocalStorage(this.formGroup.value);
    this.updatingChart = true;
    // console.log(`${where}  ${this.updatingChart}`);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('number', 'Production');
    dataTable.addColumn('number', 'Cost/Production');
    // A column for custom tooltip content
    dataTable.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
    dataTable.addColumn({ type: 'string', role: 'style' });

    dataTable.addRows(this.googleCreateProductionData());

    var options = {
      tooltip: { isHtml: true },
      legend: 'none',
      explorer: {
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomIn: 4.0
      }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(dataTable, options);
    this.updatingChart = false;
    // console.log(`${where}  ${this.updatingChart}`);
  }

  googleCreateProductionData(): Array<Array<any>> {
    let proSalData = new Array<ProSalData>();
    let xVal = this.calculatedDomain.min;
    while (xVal <= this.calculatedDomain.max) {
      proSalData.push(this.proSalFunction(xVal));
      xVal += this.stepSize;
    }

    // set gain and loss points
    let lossDataPoint = this.chartService.closest(proSalData, "costToProduction", 25);
    this.lossPoint = lossDataPoint == null ? null : lossDataPoint.production;
    let gainDataPoint = this.chartService.closest(proSalData, "totalPay", this.formGroup.get("desiredSalary").value);
    this.gainPoint = gainDataPoint == null ? null : gainDataPoint.production;

    let ret = new Array<Array<any>>();
    proSalData
      .filter((psd: ProSalData) => this.xAxis.min < psd.production && psd.production < this.xAxis.max)
      .forEach((psd: ProSalData) => {
        ret.push([psd.production, psd.costToProduction, this.chartService.createToolTipString(psd), this.psdToColor(psd)]);
      });

    // console.log(JSON.stringify(ret));

    return ret;
  }

  proSalFunction(production: number): ProSalData {
    let basePay = this.formGroup.get("basePay").value;
    let percentProduction = this.chartService.toPercent(this.formGroup.get("percentProduction").value);
    let staticCosts = this.formGroup.get("staticCosts").value;
    let payAdjustedCostPercent = this.chartService.toPercent(this.formGroup.get("payAdjustedCostPercent").value);

    let productionPay = production * percentProduction;
    let additionalProductionPay =
      productionPay - basePay > 0 ?
        productionPay - basePay : 0;

    let totalPay: number = 0
    let totalCost: number = 0;
    let costToProduction: number = 0;
    if (this.formGroup.get("stopLoss").value) {
      totalPay = basePay + additionalProductionPay;
      totalCost = staticCosts + payAdjustedCostPercent * totalPay + totalPay;
      costToProduction = totalCost / production;

      // determine totalPay based on costToProductionLossPercent
      if (costToProduction > this.costToProductionLossPercent) {
        totalPay = (this.costToProductionLossPercent * production - staticCosts)/(payAdjustedCostPercent + 1);
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
    let opacity = proSalData.totalPay <= this.formGroup.get("desiredSalary").value ? .2 : 1;

    if (proSalData.costToProduction > this.formGroup.get("unfairHigh").value) {
      return `color: red; opacity: ${opacity};`
    } else if (proSalData.costToProduction > this.formGroup.get("fairHigh").value) {
      return `color: yellow; opacity: ${opacity};`
    } else if (proSalData.costToProduction > this.formGroup.get("fairLow").value) {
      return `color: green; opacity: ${opacity};`
    } else if (proSalData.costToProduction > this.formGroup.get("unfairLow").value) {
      return `color: yellow; opacity: ${opacity};`
    }
    return `color: red; opacity: ${opacity};`
  }


  onEnter(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      if (this.debouncedInput &&  this.debouncedInput.timeStamp == event.timeStamp) {
        // console.log("throwing away one.")
        return;
      }
      this.debouncedInput = event;
      this.drawChart("onEnter");
      return false
    }
  }

  private invalidRangeValidations: ValidatorFn = (fg: FormGroup): ValidationErrors | null => {
    const unfairLow = fg.get("unfairLow").value;
    const fairLow = fg.get("fairLow").value;
    const fairHigh = fg.get("fairHigh").value;
    const unfairHigh = fg.get("unfairHigh").value;

    return unfairHigh < fairHigh ||
      fairHigh < fairLow ||
      fairLow < unfairLow ? { 'invalidRange': true } : null;
  }

  convertProSalToForm(proSal: ProSalForm = DefaultProSalForm): FormGroup {
    return this.fb.group({
      "basePay": proSal.basePay,
      "desiredSalary": proSal.desiredSalary,
      "percentProduction": proSal.percentProduction,
      "staticCosts": proSal.staticCosts,
      "payAdjustedCostPercent": proSal.payAdjustedCostPercent,
      "stopLoss": proSal.stopLoss,
      "unfairLow": proSal.unfairLow,
      "fairLow": proSal.fairLow,
      "fairHigh": proSal.fairHigh,
      "unfairHigh": proSal.unfairHigh,
    }, { validators: this.invalidRangeValidations });
  }
}
