import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * Component will allow for removing, adding, and selecting
 * of a single item from an array of strings. 
 * 
 * Changes will happen to the array passed in by reference.
 * A change event will be emitted when an item is added or removed.
 * A selection event will be emitted when an item is selected.
 */
@Component({
  selector: 'app-chipped-auto-complete-single-select',
  templateUrl: './chipped-auto-complete-single-select.component.html',
  styleUrls: ['./chipped-auto-complete-single-select.component.css']
})
export class ChippedAutoCompleteSingleSelectComponent {
  @Input() list: Array<string> = [];
  @Output() listChanged: EventEmitter<string>;
  @Output() itemSelected: EventEmitter<string>;

  inputControl: FormControl;
  filteredItems: Observable<Array<string>>;
  selectedItem: string;

  @ViewChild('singleChippedInput') inputElement: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.inputControl = new FormControl();
    this.listChanged = new EventEmitter<string>();
    this.itemSelected = new EventEmitter<string>();
    this.selectedItem = null;
    this.filteredItems = this.inputControl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => {
        return item ? this.filterItem(item) : this.list.slice()
      })
    );
  }

  private filterItem(item: string): string[] {
    const filterValue = item.toLowerCase();
    let ret = this.list.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
    return ret;
  }

  /**
   * Add the selectedItem to the list and emit change event
   */
  save(event: MatChipInputEvent): void {

    if (this.selectedItem == null) {
      return;
    }
    this.list.push(this.selectedItem);
    this.listChanged.emit(this.selectedItem);
    // this.inputControl.setValue(null);
  }

  delete(item: string): void {
    const index = this.list.indexOf(item);
    if (index >= 0) {
      this.list.splice(index, 1);
      this.listChanged.emit(item);
    }
  }

  removeSelection(): void {
    this.itemSelected = null
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedItem = event.option.viewValue;
    this.inputElement.nativeElement.value = '';
    this.inputControl.setValue(null);

    this.itemSelected.emit(this.selectedItem);
  }
}
