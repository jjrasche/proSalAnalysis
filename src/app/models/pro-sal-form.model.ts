import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export class ProSalForm {
    basePay: number;
    desiredSalary: number;
    percentProduction: number;
    staticCosts: number;
    payAdjustedCostPercent: number;
    stopLoss: boolean;
    unfairLow: number;
    fairLow: number;
    fairHigh: number;
    unfairHigh: number;
}

export const DefaultProSalForm: ProSalForm = {
    basePay: 0, // 78000,
    desiredSalary: 0, // 85000,
    percentProduction: 0, // 18.5,
    staticCosts: 0, // 5700,
    payAdjustedCostPercent: 0, // 8.38,
    stopLoss: false, // false,
    unfairLow: 0, // 21,
    fairLow: 0, // 22,
    fairHigh: 0, // 24,
    unfairHigh: 0, // 25
}
