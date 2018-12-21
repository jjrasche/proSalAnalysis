import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `  
    <div fxLayout="row" fxLayoutAlign="center center">
      <mat-spinner> </mat-spinner>
    </div>
    `,
})
export class SpinnerComponent {
  constructor() { }
}
