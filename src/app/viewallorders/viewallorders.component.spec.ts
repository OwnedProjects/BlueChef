import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallordersComponent } from './viewallorders.component';

describe('ViewallordersComponent', () => {
  let component: ViewallordersComponent;
  let fixture: ComponentFixture<ViewallordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewallordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
