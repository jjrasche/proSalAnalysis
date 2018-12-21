import { TestBed } from '@angular/core/testing';

import { ChartService } from './chart.service';
import { TestData } from './chart.service.spec.data';

describe('ChartService', () => {
  let service: ChartService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ChartService);
  });

  it('Happy Path, first of array', () => {
    const data = [{ test: 3 }, { test: 5 },{ test: 7 }];
    let result = service.closest(data, "test", 3);
    expect(result).toEqual({ test: 3 });
  });

  it('Happy Path, middle of array', () => {
    const data = [{ test: 3 }, { test: 5 }, { test: 7 }];
    let result = service.closest(data, "test", 5);
    expect(result).toEqual({ test: 5 });
  });

  it('Happy Path, last of array', () => {
    const data = [{ test: 3 }, { test: 5 }, { test: 7 }];
    let result = service.closest(data, "test", 7);
    expect(result).toEqual({ test: 7 });
  });

  it('Exact middle of two numbers should choose higher option', () => {
    const data = [{ test: 3 }, { test: 5 }, { test: 7 }];
    expect(service.closest(data, "test", 4)).toEqual({ test: 5 });
    expect(service.closest(data, "test", 6)).toEqual({ test: 7 });
  });

  it('Goal outside range bring extremes', () => {
    const data = [{ test: 3 }, { test: 5 }, { test: 7 }];
    let result = service.closest(data, "test", 100);
    expect(result).toEqual({ test: 7 });
    result = service.closest(data, "test", 0);
    expect(result).toEqual({ test: 3 });
  });

  it('Unordered array Goal outside range bring extremes', () => {
    const data = [{ test: 7 }, { test: 3 }, { test: 5 }];
    expect(service.closest(data, "test", 3)).toEqual({ test: 3 });
    expect(service.closest(data, "test", 4)).toEqual({ test: 5 });
    expect(service.closest(data, "test", 10)).toEqual({ test: 7 });
  });

  it('RealData test.', () => {
    let expected = { "production": 1995000, "totalPay": 369075, "totalCost": 405703.48, "costToProduction": 20.34 };
    expect(service.closest(TestData, "totalPay", 369075)).toEqual(expected);

    expected = { "production": 421500, "totalPay": 78000, "totalCost": 90236.4, "costToProduction": 21.41 };
    expect(service.closest(TestData, "totalPay", 78000)).toEqual(expected);
  });
});
