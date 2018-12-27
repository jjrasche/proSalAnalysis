import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChippedAutoCompleteSingleSelectComponent } from './chipped-auto-complete-single-select.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChippedAutoCompleteSingleSelectComponent', () => {
  let component: ChippedAutoCompleteSingleSelectComponent;
  let fixture: ComponentFixture<ChippedAutoCompleteSingleSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ChippedAutoCompleteSingleSelectComponent
      ],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChippedAutoCompleteSingleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('When supplied with a list of elements ["ice cake" and "ice cream"] typing "i" returns both in autocomplet.', () => {
    component.list = ["ice cake", "ice cream", "test", "doesn't begin with i"];
    sendInput("i").then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('mat-option').length).toBe(1);
      expect(fixture.nativeElement.textContent).toContain('John Rambo');
    });

    let actual = [].slice.call(document.getElementsByTagName("mat-option"));
    let expected = ["ice cake", "ice cream"];
    expect(actual).toEqual(expected);
  });

  // it('When supplied with a list of elements ["ice cream"] typing "i" returns autocomplete with delete option.', () => {
  //   component.list = ["ice cream"];
  //   enterDataInInput("ice");

  //   let deleteButton = document.getElementsByClassName("single-chipped-input-delete-button")
  //   expect(deleteButton).not.toBeNull();
  // });

  // it('When supplied with a list of elements ["ice cream"] typing "i" and selecting "ice cream changes selectedItem and emits event', () => {
  //   spyOn(component.itemSelected, 'emit');
  //   component.list = ["ice cream"];
  //   enterDataInInput("ice");
  //   let autoCompleteElement = document.getElementsByClassName("auto-complete-element")[0] as HTMLElement;
  //   autoCompleteElement.click();

  //   expect(component.selectedItem).toEqual("ice cream");
  //   expect(component.itemSelected.emit).toHaveBeenCalled()  

  // });

  // it('When clicking delete on an autocomplete option, a change event is emitted and the inputs are modified', () => {
  //   spyOn(component.listChanged, 'emit');
  //   component.list = ["ice cream"];
  //   enterDataInInput("ice");

  //   let deleteButton = document.getElementsByClassName("single-chipped-input-delete-button")[0] as HTMLButtonElement;
  //   deleteButton.click();

  //   expect(component.list).toEqual([]);
  //   expect(component.listChanged.emit).toHaveBeenCalled()  
  // });

  // it('When entering "ice cream" and pressing save a creation event is emitted', () => {
  //   spyOn(component.listChanged, 'emit');
  //   component.list = ["ice cake"];
  //   enterDataInInput("ice cream");
  //   let saveButton = document.getElementById("single-chipped-input-save-button") as HTMLButtonElement;
  //   saveButton.click();

  //   expect(component.list).toEqual(["ice cream"]);
  //   expect(component.listChanged.emit).toHaveBeenCalled()  
  // });

  function sendInput(text: string) {
    let inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.focus();
    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  function simulateKeyPress(key: string) {
    let input = getInputElement();
    const event = new KeyboardEvent("keypress", { "key": key });
    input.dispatchEvent(event);
  }

  function getInputElement(): HTMLInputElement {
    return document.getElementById("single-chipped-input") as HTMLInputElement;
  }

  /**
   * autocomplete opens to choose entries
   * can create entry and it's added in autocomplete
   * can delete entry from autocomplete they're removed from autocomplete
   */
});
