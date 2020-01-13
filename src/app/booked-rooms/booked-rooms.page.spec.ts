import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedRoomsPage } from './booked-rooms.page';

describe('BookedRoomsPage', () => {
  let component: BookedRoomsPage;
  let fixture: ComponentFixture<BookedRoomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedRoomsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
