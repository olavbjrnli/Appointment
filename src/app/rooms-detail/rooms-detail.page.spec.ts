import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsDetailPage } from './rooms-detail.page';

describe('RoomsDetailPage', () => {
  let component: RoomsDetailPage;
  let fixture: ComponentFixture<RoomsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
