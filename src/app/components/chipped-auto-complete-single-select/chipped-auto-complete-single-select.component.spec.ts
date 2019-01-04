import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ChippedAutoCompleteSingleSelectComponent } from './chipped-auto-complete-single-select.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ENTER } from '@angular/cdk/keycodes';

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

  it('When supplied with a list of elements ["ice cake", "ice cream"] typing "i" returns both in autocomplete.', fakeAsync(() => {
    component.list = ["ice cake", "ice cream", "test", "doesn't begin with i"];
    sendInput("i").then(() => {
      fixture.detectChanges();
      expect(document.getElementsByTagName("mat-option").length).toBe(2);
    });
    tick();
  }));

  it('When supplied with a list of elements ["ice cream"] typing "i" and selecting "ice cream changes selectedItem and emits event', fakeAsync(() => {
    spyOn(component.selectedItemChange, 'emit');
    component.list = ["ice cream"];
    sendInput("i").then(() => {
      selectOption(0);
      expect(component.selectedItem).toEqual("ice cream");
      expect(component.selectedItemChange.emit).toHaveBeenCalled()  
    });
    tick();
  }));

  it('When an item is selected, can click cancel button and it is un selected', fakeAsync(() => {
    spyOn(component.selectedItemChange, 'emit');
    component.list = ["ice cake", "ice cream"];
    component.selectedItem = "ice cake";
    fixture.detectChanges();
    clickButton(document.getElementsByClassName("mat-chip-remove")[0] as HTMLButtonElement)

    expect(component.selectedItem).toBeNull();
    expect(component.selectedItemChange.emit).toHaveBeenCalled()
    tick();
  }));

  it('When clicking delete on a selected autocomplete option, a change event is emitted and the inputs are modified', fakeAsync(() => {
    spyOn(component.listChanged, 'emit');
    component.list = ["ice cream"];
    sendInput("i").then(() => {
      selectOption(0);

      clickButton(document.getElementById("single-chipped-input-delete-button") as HTMLButtonElement);

      expect(component.list).toEqual([]);
      expect(component.listChanged.emit).toHaveBeenCalled();
      let input = document.getElementById("single-chipped-input") as HTMLInputElement;
      expect(input.value).toEqual("");
      let chips = document.getElementsByTagName("mat-chip");
      expect(chips.length).toBe(0);
    });
    tick();
  }));

  // it('When entering "ice cream" and pressing enter the list and seletectItem is updated', fakeAsync(() => {
  //   spyOn(component.selectedItemChange, 'emit');
  //   spyOn(component.listChanged, 'emit');
  //   sendInput("ice cream").then(() => {
  //     expect(component.list).toEqual([]);
  //     expect(component.selectedItem).toBeNull();

  //     // blur 
  //     let input = (document.getElementById("single-chipped-input") as HTMLInputElement;
  //     input.blur();

  //     expect(component.list).toEqual(["ice cream"]);
  //     expect(component.listChanged.emit).not.toHaveBeenCalled();
  //     expect(component.selectedItemChange.emit).toHaveBeenCalled();

  //     expect((document.getElementById("single-chipped-input") as HTMLInputElement).value).toEqual("");
  //     expect(document.getElementsByTagName("mat-chip").length).toBe(1);
  //   });
  //   tick();
  // }));

  it('When entering "ice cream" and pressing save a creation event is emitted and list is updated', fakeAsync(() => {
    spyOn(component.listChanged, 'emit');
    sendInput("ice cream").then(() => {
      expect(component.list).toEqual([]);
      expect(component.selectedItem).toBeNull();

      clickButton(document.getElementById("single-chipped-input-save-button") as HTMLButtonElement);

      expect(component.list).toEqual(["ice cream"]);
      expect(component.listChanged.emit).toHaveBeenCalled()
      let input = document.getElementById("single-chipped-input") as HTMLInputElement;
      expect(input.value).toEqual("");
      let chips = document.getElementsByTagName("mat-chip");
      expect(chips.length).toBe(1);
    });
    tick();
  }));

  function sendInput(text: string) {
    let inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.focus();
    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  function selectOption(idx: number): void {
    fixture.detectChanges();
    let option = document.getElementsByTagName("mat-option")[idx] as HTMLOptionElement;
    option.click()
    fixture.detectChanges();
  }

  function clickButton(button: HTMLButtonElement): void {
    button.click();
    fixture.detectChanges();
  }

  function simulateKeyPressOnInput(key: string) {
    let input = getInputElement();
    const event = new KeyboardEvent("keypress", { "key": key });
    input.dispatchEvent(event);
  }

  function getInputElement(): HTMLInputElement {
    return document.getElementById("single-chipped-input") as HTMLInputElement;
  }
});
