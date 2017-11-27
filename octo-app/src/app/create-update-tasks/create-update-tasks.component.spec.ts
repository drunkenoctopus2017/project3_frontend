import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTasksComponent } from './create-update-tasks.component';

describe('CreateUpdateTasksComponent', () => {
  let component: CreateUpdateTasksComponent;
  let fixture: ComponentFixture<CreateUpdateTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
