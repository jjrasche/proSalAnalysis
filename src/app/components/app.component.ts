import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ProSalData } from "../models/pro-sal-data.model"
import { Domain } from "../models/domain.model"
import { ChartService } from '../services/chart.service';
declare let google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  lineChartData: Object;
  formGroup: FormGroup;
  updatingChart: boolean = false;
  private stepSize = 500;
  private calculatedDomain: Domain = { min: 120000, max: 1200000 };
  private xAxis: Domain = {min:120000, max:720000};
  lossPoint: number;
  gainPoint: number;
  debouncedInput: KeyboardEvent;
  
  public get costToProductionLossPercent() : number {
    return this.formGroup.get("unacceptablyHighCostToProduction").value / 100;
  }
  
  constructor(public fb: FormBuilder,
              public chartService: ChartService) {
  }

  ngOnInit(): void {
    // let func = function () {
    //   this.status = !this.status;
    //   setTimeout(() => { func.bind(this)() }, 1000)
    // };
    // func.bind(this)();

    this.formGroup = this.fb.group({
      "basePay": 78000,
      "desiredSalary": 85000,
      "percentProduction": 18.5,
      "staticCosts": 5700,
      "payAdjustedCostPercent": 8.38,
      "stopLoss": false,
      "unacceptablyLowCostToProduction": 21,
      "fairLowCostToProduction": 22,
      "fairHighCostToProduction": 24,
      "unacceptablyHighCostToProduction": 25,
    }, { validators: this.costToProducitonInputRangeValidations });
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));

    this.formGroup.get("stopLoss").valueChanges.pipe()
      .subscribe((stopLoss: boolean) => {
        this.drawChart();
        if (stopLoss) {
          this.formGroup.get("basePay").disable();
        } else {
          this.formGroup.get("basePay").enable();
        }
      });

    // this.formGroup.get("unacceptablyLowCostToProduction").valueChanges.pipe()
    //   .subscribe((unacceptableLow: number) => {
    //     if (unacceptableLow > this.formGroup.get("fairLowCostToProduction").value ||
    //       unacceptableLow > this.formGroup.get("fairHighCostToProduction").value ||
    //       unacceptableLow > this.formGroup.get("unacceptablyHighCostToProduction").value){
            
    //     }
    //     this.drawChart();
    //   });
  }

  drawChart(where:string = "onload") {
    if(this.formGroup.errors) {
      return;
    }
    if (this.updatingChart) {
      return;
    }
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
    let opacity = proSalData.totalPay <= this.formGroup.get("desiredSalary").value ? .15 : 1;

    if (proSalData.costToProduction > this.formGroup.get("unacceptablyHighCostToProduction").value) {
      return `color: red; opacity: ${opacity};`
    } else if (proSalData.costToProduction > this.formGroup.get("fairHighCostToProduction").value) {
      return `color: yellow; opacity: ${opacity};`
    } else if (proSalData.costToProduction > this.formGroup.get("fairLowCostToProduction").value) {
      return `color: green; opacity: ${opacity};`
    } else if (proSalData.costToProduction > this.formGroup.get("unacceptablyLowCostToProduction").value) {
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

  private costToProducitonInputRangeValidations: ValidatorFn = (fg: FormGroup): ValidationErrors | null => {
    const unacceptablyLowCostToProduction = fg.get("unacceptablyLowCostToProduction").value;
    const fairLowCostToProduction = fg.get("fairLowCostToProduction").value;
    const fairHighCostToProduction = fg.get("fairHighCostToProduction").value;
    const unacceptablyHighCostToProduction = fg.get("unacceptablyHighCostToProduction").value;

    return unacceptablyHighCostToProduction < fairHighCostToProduction ||
      fairHighCostToProduction < fairLowCostToProduction ||
      fairLowCostToProduction < unacceptablyLowCostToProduction ? { 'invalidCostToProducitonRange': true } : null;
  };
}
