import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveChart2Component } from './interactive-chart2.component';

describe('InteractiveChart2Component', () => {
  let component: InteractiveChart2Component;
  let fixture: ComponentFixture<InteractiveChart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveChart2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
