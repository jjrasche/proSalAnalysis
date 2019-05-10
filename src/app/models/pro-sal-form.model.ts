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
    basePay: 78000,
    desiredSalary: 85000,
    percentProduction: 18.5,
    staticCosts: 5700,
    payAdjustedCostPercent: 8.38,
    stopLoss: false,
    unfairLow: 21,
    fairLow: 22,
    fairHigh: 24,
    unfairHigh: 25
};
