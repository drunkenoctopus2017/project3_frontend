import { TestBed, inject } from '@angular/core/testing';

import { BurndownChartService } from './burndown-chart.service';

describe('BurndownChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BurndownChartService]
    });
  });

  it('should be created', inject([BurndownChartService], (service: BurndownChartService) => {
    expect(service).toBeTruthy();
  }));
});
