import { TestBed, inject } from '@angular/core/testing';

import { AssignMembersService } from './assign-members.service';

describe('AssignMembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignMembersService]
    });
  });

  it('should be created', inject([AssignMembersService], (service: AssignMembersService) => {
    expect(service).toBeTruthy();
  }));
});
