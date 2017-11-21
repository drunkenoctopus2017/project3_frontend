import { TestBed, inject } from '@angular/core/testing';

import { StoryServiceService } from './story-service.service';

describe('StoryServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoryServiceService]
    });
  });

  it('should be created', inject([StoryServiceService], (service: StoryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
