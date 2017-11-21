import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditBoardComponent } from './create-or-edit-board.component';

describe('CreateOrEditBoardComponent', () => {
  let component: CreateOrEditBoardComponent;
  let fixture: ComponentFixture<CreateOrEditBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
