import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateStoryComponent } from './create-update-story.component';

describe('CreateUpdateStoryComponent', () => {
  let component: CreateUpdateStoryComponent;
  let fixture: ComponentFixture<CreateUpdateStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
