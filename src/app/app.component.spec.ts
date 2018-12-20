import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    this.app = fixture.debugElement.componentInstance;
  }));

  it('should render title in a h1 tag', () => {
    const data = [{test: 5}, {test: 3}, {test: 7}];
    let result = app.closest(data, "test", 3)
    expect(result).toEqual({test:3});
  });
});
