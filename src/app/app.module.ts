import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components/app.component';
import { MaterialModule } from './material/material.module';
import { SpinnerComponent } from './components/spinner.component';
import { ChippedAutoCompleteSingleSelectComponent } from './components/chipped-auto-complete-single-select/chipped-auto-complete-single-select.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ChippedAutoCompleteSingleSelectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Ng2GoogleChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
