import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTaskComponent } from './create-update-task.component';

describe('CreateUpdateTaskComponent', () => {
  let component: CreateUpdateTaskComponent;
  let fixture: ComponentFixture<CreateUpdateTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
