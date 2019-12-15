import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialConditionsComponent } from './special-conditions.component';

describe('SpecialConditionsComponent', () => {
  let component: SpecialConditionsComponent;
  let fixture: ComponentFixture<SpecialConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
