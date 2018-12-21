import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProSalData } from "../models/pro-sal-data.model"
import { Domain } from "../models/domain.model"
import { ChartService } from '../services/chart.service';
declare let google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  lineChartData: Object;
  formGroup: FormGroup;
  private stepSize = 100;
  private calculatedDomain: Domain = { min: this.stepSize, max: 2000000 };
  private xAxis: Domain = {min:50000, max:700000};
  lossPoint: number;
  gainPoint: number;
  desiredBasePay: number;

  constructor(public fb: FormBuilder,
              public chartService: ChartService) {
    this.desiredBasePay = 78000;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      "basePay": 78000,
      "percentProduction": 18.5,
      "staticCosts": 5700,
      "payAdjustedCostPercent": 8.38
    });
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('number', 'Production');
    dataTable.addColumn('number', 'Cost/Production');
    // A column for custom tooltip content
    dataTable.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
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
    let gainDataPoint = this.chartService.closest(proSalData, "totalPay", this.desiredBasePay);
    this.gainPoint = gainDataPoint == null ? null : gainDataPoint.production;

    let ret = new Array<Array<any>>();
    proSalData
      .filter((psd: ProSalData) => this.xAxis.min < psd.production && psd.production < this.xAxis.max)
      .forEach((psd: ProSalData) => {
        ret.push([psd.production, psd.costToProduction, this.chartService.createToolTipString(psd)]);
      });

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
      this.drawChart();
    }
  }
}
