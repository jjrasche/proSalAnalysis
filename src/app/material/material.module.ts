import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatBadgeModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatDividerModule,
  MatCardModule,
  MatSelectModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatFormFieldModule,
   } from '@angular/material';

const modules = [
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatBadgeModule,
  MatIconModule,
  MatToolbarModule,
  FlexLayoutModule,
  MatMenuModule,
  MatDividerModule,
  MatCardModule,
  MatSelectModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatFormFieldModule,
];

@NgModule({
  imports: modules,
  exports: modules
  ,
}) export class MaterialModule { }
