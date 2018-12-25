import { Injectable } from '@angular/core';
import { ProSalData } from '../models/pro-sal-data.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  closest(array: Array<any>, key: string, goal: number) {
    return array.reduce(function (prev, curr) {
      return (Math.abs(curr[key] - goal) <= Math.abs(prev[key] - goal) ? curr : prev);
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

  trunc(input: number, precision: number = 2): number {
    return parseFloat(input.toFixed(precision));
  }

  toPercent(input: number): number {
    return input / 100;
  }

  fromPercent(input: number): number {
    return input * 100;
  }
}
