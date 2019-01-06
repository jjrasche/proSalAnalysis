import { Injectable } from '@angular/core';
import { ProSalForm, DefaultProSalForm } from '../models/pro-sal-form.model';
import { FormGroup, ValidatorFn, ValidationErrors, FormBuilder } from '@angular/forms';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class SavedFormService {

  constructor(
    private localStorageService: LocalStorageService,
    private fb: FormBuilder) { }
  
  getSelectedFormFromLocalStorage(): FormGroup {
    let selectedForm = this.localStorageService.getSelectedForm();
    let forms = this.localStorageService.getFormsFromLocalStorage();
    const formString = forms[selectedForm];

    // no form selected return default
    if (selectedForm == null) {
      return this.convertProSalToForm(DefaultProSalForm);
    }
    // form selected, but no form found. e.g. still in process of saving
    else if (formString == null) {
      return null;
    } else {
      return this.convertProSalToForm(formString);
    }
  }

  invalidRangeValidations: ValidatorFn = (fg: FormGroup): ValidationErrors | null => {
    const unfairLow = fg.get("unfairLow").value;
    const fairLow = fg.get("fairLow").value;
    const fairHigh = fg.get("fairHigh").value;
    const unfairHigh = fg.get("unfairHigh").value;

    return unfairHigh < fairHigh ||
      fairHigh < fairLow ||
      fairLow < unfairLow ? { 'invalidRange': true } : null;
  }

convertProSalToForm(proSal: ProSalForm): FormGroup {
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
