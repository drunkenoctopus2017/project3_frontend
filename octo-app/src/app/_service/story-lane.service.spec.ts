import { TestBed, inject } from '@angular/core/testing';

import { StoryLaneService } from './story-lane.service';

describe('StoryLaneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoryLaneService]
    });
  });

  it('should be created', inject([StoryLaneService], (service: StoryLaneService) => {
    expect(service).toBeTruthy();
  }));
});
