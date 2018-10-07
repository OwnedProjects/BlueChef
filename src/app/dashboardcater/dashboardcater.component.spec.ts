import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardcaterComponent } from './dashboardcater.component';

describe('DashboardcaterComponent', () => {
  let component: DashboardcaterComponent;
  let fixture: ComponentFixture<DashboardcaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardcaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardcaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
