/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OfftopComponent } from './offtop.component';

describe('OfftopComponent', () => {
  let component: OfftopComponent;
  let fixture: ComponentFixture<OfftopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfftopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfftopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
