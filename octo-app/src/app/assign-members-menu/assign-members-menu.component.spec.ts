import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMembersMenuComponent } from './assign-members-menu.component';

describe('AssignMembersMenuComponent', () => {
  let component: AssignMembersMenuComponent;
  let fixture: ComponentFixture<AssignMembersMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignMembersMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignMembersMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
