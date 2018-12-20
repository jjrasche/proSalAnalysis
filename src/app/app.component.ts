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
  private stepSize = 500;
  private xAxis: Domain = {min:300000, max:700000};

  constructor(public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      "basePay": 78000,
      "percentProduction": .185
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
    dataTable.addColumn({ type: 'string', role: 'tooltip' });
    dataTable.addRows(this.googleCreateProductionData());

    var options = {
      tooltip: { isHtml: true },
      legend: 'none'
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
    let xVal = this.xAxis.min;
    while (xVal <= this.xAxis.max) {
      let proSalData = this.proSalFunction(xVal);
      data.push([xVal, proSalData.costToProduction, proSalData.totalPay, proSalData.totalCost]);
      xVal += this.stepSize;
    }
    return data;
  }

  googleCreateProductionData(): Array<Array<any>> {
    let data = new Array<Array<any>>();
    let xVal = this.xAxis.min;
    while (xVal <= this.xAxis.max) {
      let proSalData = this.proSalFunction(xVal);
      data.push([proSalData.production, proSalData.costToProduction, this.createToolTipString(proSalData)]);
      xVal += this.stepSize;
    }
    console.log(JSON.stringify(data));
    return data;
  }

  createToolTipString(data: ProSalData): string {
    return `Production: ${data.production.toString()}\nCost: ${data.totalCost.toString()}\nPay: ${data.totalPay.toString()}\nCost/Production: ${data.costToProduction.toString()}`;
  }

  initChart() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var dataTable = new google.visualization.DataTable();
      dataTable.addColumn('number', 'Production');
      dataTable.addColumn('number', 'Cost/Production');
      // A column for custom tooltip content
      dataTable.addColumn({ type: 'string', role: 'tooltip' });
      dataTable.addRows(this.googleCreateProductionData());

      var options = {
        tooltip: { isHtml: true },
        legend: 'none'
      };
      var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
      chart.draw(dataTable, options);
    }
  }

  proSalFunction(production: number): ProSalData {
    let basePay = this.formGroup.get("basePay").value;
    let percentProduction = this.formGroup.get("percentProduction").value;

    let productionPay = production * percentProduction;
    let additionalProductionPay =
      productionPay - basePay > 0 ?
        productionPay - basePay : 0;
    let totalPay = basePay + additionalProductionPay;

    let staticCosts = 5700;
    let payAdjustedCostPercent = .0838;

    let totalCost = staticCosts + payAdjustedCostPercent * totalPay + totalPay;
    let costToProduction = totalCost / production;

    return { 
      production: this.trunc(production),
      totalPay: this.trunc(totalPay),
      totalCost: this.trunc(totalCost),
      costToProduction: this.trunc(costToProduction, 4)
    };
  }

  trunc(input: number, precision: number = 3): number {
    return parseFloat(input.toFixed(precision));
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