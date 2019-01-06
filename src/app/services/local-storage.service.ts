import { Injectable } from '@angular/core';
import { ProSalForm } from '../models/pro-sal-form.model';

const formsKey = "pro-sal-analyisis-saved-data";
const selectedFormKey = "pro-sal-selected-form";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getFormsFromLocalStorage(): Object {
    let forms = JSON.parse(localStorage.getItem(formsKey)) as { name: ProSalForm };
    return forms == null ? {} : forms;
  }

  addFormToLocalStorage(form: ProSalForm) {
    let forms = this.getFormsFromLocalStorage();
    let selectedForm = this.getSelectedForm();
    if (selectedForm == null) {
      throw Error("selectedForm shouldn't be null!");
    }
    this.addForm(forms, selectedForm, form);
    console.log(`added form ${selectedForm} to local storage. count(${Object.keys(forms).length})`)
  }

  safeAddFormToLocalStorage(form: ProSalForm) {
    let forms = this.getFormsFromLocalStorage();
    let selectedForm = this.getSelectedForm();
    if (selectedForm == null || forms == {}) {
      return;
    }
    this.addForm(forms, selectedForm, form);
    console.log(`added safe form ${selectedForm} to local storage. count(${Object.keys(forms).length})`)
  }

  private addForm(forms: Object, selectedForm: string, form: ProSalForm) {
    forms[selectedForm] = form;
    localStorage.setItem(formsKey, JSON.stringify(forms));
  }

  removeFormFromLocalStorage() {
    let forms = this.getFormsFromLocalStorage();
    let selectedForm = this.getSelectedForm();
    if (selectedForm == null) {
      throw Error("selectedForm shouldn't be null!");
    }
    delete forms[selectedForm];
    localStorage.setItem(formsKey, JSON.stringify(forms)); 
    console.log(`removed form ${selectedForm} from local storage. count(${Object.keys(forms).length})`)

  }

  getSelectedForm(): string {
    return localStorage.getItem(selectedFormKey);
  }

  setSelectedForm(formName: string) {
    if (formName == null) {
      localStorage.removeItem(selectedFormKey);
    } else {
      localStorage.setItem(selectedFormKey, formName);
    }
    // if (formName == null) {
    //   throw Error("selectedForm shouldn't be null!");
    // }
    console.log(`set selected form to ${formName} in local storage. count(${Object.keys(this.getFormsFromLocalStorage()).length})`)
  }
}
