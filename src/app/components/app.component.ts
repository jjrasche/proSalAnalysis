import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProSalData } from "../models/pro-sal-data.model"
import { Domain } from "../models/domain.model"
import { ChartService } from '../services/chart.service';
import { Observable, Subject } from 'rxjs';
declare let google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  lineChartData: Object;
  formGroup: FormGroup;
  updatingChart: boolean = false;
  private stepSize = 500;
  private calculatedDomain: Domain = { min: this.stepSize, max: 2000000 };
  private xAxis: Domain = {min:120000, max:720000};
  lossPoint: number;
  gainPoint: number;
  desiredSalary: number = 85000;
  debouncedInput: KeyboardEvent;

  status: boolean = false;

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
      "percentProduction": 18.5,
      "staticCosts": 5700,
      "payAdjustedCostPercent": 8.38
    });
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart(where:string = "onload") {
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
    let gainDataPoint = this.chartService.closest(proSalData, "totalPay", this.desiredSalary);
    this.gainPoint = gainDataPoint == null ? null : gainDataPoint.production;

    let ret = new Array<Array<any>>();
    proSalData
      .filter((psd: ProSalData) => this.xAxis.min < psd.production && psd.production < this.xAxis.max)
      .forEach((psd: ProSalData) => {
        ret.push([psd.production, psd.costToProduction, this.chartService.createToolTipString(psd), this.chartService.psdToColor(psd, this.desiredSalary)]);
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
    let totalPay = basePay + additionalProductionPay;

    let totalCost = staticCosts + payAdjustedCostPercent * totalPay + totalPay;
    let costToProduction = totalCost / production;

    return {
      production: this.chartService.trunc(production),
      totalPay: this.chartService.trunc(totalPay),
      totalCost: this.chartService.trunc(totalCost),
      costToProduction: this.chartService.trunc(this.chartService.fromPercent(costToProduction))
    };
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
}
