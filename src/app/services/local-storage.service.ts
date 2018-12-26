import { Injectable } from '@angular/core';
import { ProSalForm } from '../models/pro-sal-form.model';

const forsmKey = "pro-sal-analyisis-saved-data"
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private getFormsFromLocalStorage(): { name: ProSalForm } {
    return JSON.parse(localStorage.getItem(`${forsmKey}`)) as { name: ProSalForm };
  }

  getFormFromLocalStorage(formName: string): ProSalForm {
    let forms = this.getFormsFromLocalStorage();
    return forms[formName];
  }

  addFormToLocalStorage(formName: string, form: ProSalForm) {
    let forms = this.getFormsFromLocalStorage();
    forms[formName] = form;
    localStorage.setItem(forsmKey, JSON.stringify(forms));
  }

  removeFormFromLocalStorage(formName: string) {
    let forms = this.getFormsFromLocalStorage();
    delete forms[formName];
    localStorage.setItem(forsmKey, JSON.stringify(forms));
  }
}
