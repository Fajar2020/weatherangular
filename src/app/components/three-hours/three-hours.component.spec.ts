import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeHoursComponent } from './three-hours.component';

describe('ThreeHoursComponent', () => {
  let component: ThreeHoursComponent;
  let fixture: ComponentFixture<ThreeHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
