import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardStoryLanesComponent } from './board-story-lanes.component';

describe('BoardStoryLanesComponent', () => {
  let component: BoardStoryLanesComponent;
  let fixture: ComponentFixture<BoardStoryLanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardStoryLanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardStoryLanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
