import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
declare let google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lineChartData: Object;
  formGroup: FormGroup;
  private stepSize = 200;
  private calculatedDomain: Domain = { min: this.stepSize, max: 2000000 };
  private xAxis: Domain = {min:50000, max:700000};
  lossPoint: number;
  gainPoint: number;
  desiredBasePay: number;

  constructor(public fb: FormBuilder) {
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
    
    // this.lineChartData = {
    //   chartType: 'LineChart',
    //   dataTable: this.createDataTable(),
    //   options: { 'title': 'Production' },
    // };
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

  createDataTable(): Array<Array<any>> {
    let ret: Array<Array<any>> = [
      ['Production', 'Cost/Production'],
    ]
    let productionData = this.createProductionData();
    return ret.concat(productionData);
  }

  createProductionData(): Array<Array<number>> {
    let data = new Array<Array<number>>();
    let xVal = this.calculatedDomain.min;
    while (xVal <= this.calculatedDomain.max) {
      let proSalData = this.proSalFunction(xVal);
      data.push([xVal, proSalData.costToProduction, proSalData.totalPay, proSalData.totalCost]);
      xVal += this.stepSize;
    }
    return data;
  }

  googleCreateProductionData(): Array<Array<any>> {
    let proSalData = new Array<ProSalData>();
    let xVal = this.calculatedDomain.min;
    while (xVal <= this.calculatedDomain.max) {
      proSalData.push(this.proSalFunction(xVal));
      xVal += this.stepSize;
    }

    // set gain and loss points
    let lossDataPoint = proSalData.find((psd: ProSalData) => psd.costToProduction < 25);
    this.lossPoint = lossDataPoint == null ? null : lossDataPoint.production;
    let gainDataPoint = proSalData.find((psd: ProSalData) => psd.totalPay > this.desiredBasePay);
    let gainDataPoint2 = this.closest(proSalData, "totalPay", this.desiredBasePay);
    this.gainPoint = gainDataPoint2 == null ? null : gainDataPoint2.production;

    console.log(proSalData.length);
    let ret = new Array<Array<any>>();
    proSalData
      .filter((psd: ProSalData) => this.xAxis.min < psd.production && psd.production < this.xAxis.max)
      .forEach((psd: ProSalData) => {
        ret.push([psd.production, psd.costToProduction, this.createToolTipString(psd)]);
      });

    return ret;
  }

  closest(array: Array<any>, key: string, goal: number) {
    return array.reduce(function (prev, curr) {
      return (Math.abs(curr[key] - goal) < Math.abs(prev[key] - goal) ? curr : prev);
    });
  }

  createToolTipString(data: ProSalData): string {
    return `<span>
        <span>Production: ${data.production.toString()}</span></br>
        <span>Cost: ${data.totalCost.toString()}</span></br>
        <span><b>Pay: ${data.totalPay.toString()}</b></span></br>
        <span>Cost/Production: ${data.costToProduction.toString()}</span>
      </span>`;
  }

  proSalFunction(production: number): ProSalData {
    let basePay = this.formGroup.get("basePay").value;
    let percentProduction = this.toPercent(this.formGroup.get("percentProduction").value);
    let staticCosts = this.formGroup.get("staticCosts").value;
    let payAdjustedCostPercent = this.toPercent(this.formGroup.get("payAdjustedCostPercent").value);

    let productionPay = production * percentProduction;
    let additionalProductionPay =
      productionPay - basePay > 0 ?
        productionPay - basePay : 0;
    let totalPay = basePay + additionalProductionPay;

    let totalCost = staticCosts + payAdjustedCostPercent * totalPay + totalPay;
    let costToProduction = totalCost / production;

    return { 
      production: this.trunc(production),
      totalPay: this.trunc(totalPay),
      totalCost: this.trunc(totalCost),
      costToProduction: this.trunc(this.fromPercent(costToProduction))
    };
  }

  trunc(input: number, precision: number = 2): number {
    return parseFloat(input.toFixed(precision));
  }

  toPercent(input: number): number {
    return input/100;
  }

  fromPercent(input: number): number {
    return input * 100;
  }

  onEnter(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.drawChart();
    }
  }
}

class Domain {
  min: number;
  max: number;
}

class ProSalData {
  production: number;
  totalPay: number;
  totalCost: number
  costToProduction: number;
}