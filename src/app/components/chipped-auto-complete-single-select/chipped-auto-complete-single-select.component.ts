import { ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

type orientationType = "row" | "column";

export interface Orientation {
  inputLayout: string;
  buttonLayout: string;
  buttonAlignment: string;
}

let t: Orientation = { inputLayout: "row", buttonLayout: "row", buttonAlignment: "dslfj" };

export const orientaitonMapper: { [key: string]: Orientation } = {
  row: { inputLayout: "row", buttonLayout: "column", buttonAlignment: "space-between stretch" },
  column: { inputLayout: "column", buttonLayout: "column", buttonAlignment: "end stretch" }
}

/**
 * Component will allow for removing, adding, and selecting
 * of a single item from an array of strings. 
 * 
 * Changes will happen to the array passed in by reference.
 * A change event will be emitted when an item is added or removed.
 * A selection event will be emitted when an item is selected.
 * 
 * 
 * paths
 * - save when item selected
 * - save when item not selected but input not blank 
 * - item removed
 * - 
 */
@Component({
  selector: 'app-chipped-auto-complete-single-select',
  templateUrl: './chipped-auto-complete-single-select.component.html',
  styleUrls: ['./chipped-auto-complete-single-select.component.css']
})
export class ChippedAutoCompleteSingleSelectComponent implements OnInit {
  @Input() list: Array<string> = [];
  @Input() selectedItem: string = null;
  @Output() itemSaved: EventEmitter<string>;
  @Output() itemRemoved: EventEmitter<string>;
  @Output() selectedItemChange: EventEmitter<string>;
  // flex layout inputes
  @Input() orientation: orientationType = "row";

  layout: Orientation;
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

  ngOnInit() {
    this.layout = orientaitonMapper[this.orientation];
  }

  private filterItem(item: string): string[] {
    const filterValue = item.toLowerCase();
    let ret = this.list.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
    return ret;
  }

  /**
   * When saved is called without a selected item but with input data,
   * the input becomes the selected item and two events are emitted
   * conveying both item selected and item saved
   */
  save(): void {
    if (this.selectedItem == null) {
      let inputValue = this.inputElement.nativeElement.value;
      if (inputValue === "") {
        return;
      }
      this.selectItem(inputValue);
    }
    this.list.push(this.selectedItem);
    this.itemSaved.emit(this.selectedItem);
    this.selectedItemChange.emit(this.selectedItem);
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

  select(event: MatAutocompleteSelectedEvent): void {
    this.selectItem(event.option.viewValue);
    this.selectedItemChange.emit(this.selectedItem);
  }

  private selectItem(value: string) {
    this.selectedItem = value;
    this.inputElement.nativeElement.value = '';
    this.inputControl.setValue(null);
  }

}
