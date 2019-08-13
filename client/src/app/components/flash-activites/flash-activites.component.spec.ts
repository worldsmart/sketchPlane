import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashActivitesComponent } from './flash-activites.component';

describe('FlashActivitesComponent', () => {
  let component: FlashActivitesComponent;
  let fixture: ComponentFixture<FlashActivitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashActivitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
