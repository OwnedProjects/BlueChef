import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewalloutdelComponent } from './viewalloutdel.component';

describe('ViewalloutdelComponent', () => {
  let component: ViewalloutdelComponent;
  let fixture: ComponentFixture<ViewalloutdelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewalloutdelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewalloutdelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
