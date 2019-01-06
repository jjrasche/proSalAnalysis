import { ENTER } from '@angular/cdk/keycodes';
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
  @Input() selectedItem: string = null;
  @Output() itemSaved: EventEmitter<string>;
  @Output() itemRemoved: EventEmitter<string>;
  @Output() selectedItemChange: EventEmitter<string>;

  inputControl: FormControl;
  filteredItems: Observable<Array<string>>;
  separatorKeysCodes: Array<number> = [ENTER];

  @ViewChild('singleChippedInput') inputElement: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.inputControl = new FormControl();
    this.itemSaved = new EventEmitter<string>();
    this.itemRemoved = new EventEmitter<string>();
    this.selectedItemChange = new EventEmitter<string>();
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
      let inputValue = this.inputElement.nativeElement.value;
      if (inputValue === "") {
        return;
      }
      this.handleSelectionEnterEvent(inputValue);
    }
    this.list.push(this.selectedItem);
    this.itemSaved.emit(this.selectedItem);
  }

  delete(): void {
    const index = this.list.indexOf(this.selectedItem);
    if (index >= 0) {
      this.list.splice(index, 1);
      this.itemRemoved.emit(this.selectedItem);
    }
    this.removeSelection();
  }

  removeSelection(): void {
    this.selectedItem = null
    this.selectedItemChange.emit(this.selectedItem);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.handleSelectionEnterEvent(event.option.viewValue);
  }

  handleSelectionEnterEvent(value: string): void {
    this.selectedItem = value;
    this.inputElement.nativeElement.value = '';
    this.inputControl.setValue(null);
    this.selectedItemChange.emit(this.selectedItem);
  }

}
