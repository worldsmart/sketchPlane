/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FanficComponent } from './fanfic.component';

describe('FanficComponent', () => {
  let component: FanficComponent;
  let fixture: ComponentFixture<FanficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
