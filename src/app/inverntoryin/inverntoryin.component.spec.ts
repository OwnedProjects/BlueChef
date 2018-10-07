import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InverntoryInComponent } from './inverntory-in.component';

describe('InverntoryInComponent', () => {
  let component: InverntoryInComponent;
  let fixture: ComponentFixture<InverntoryInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InverntoryInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InverntoryInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
