import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveChart3Component } from './interactive-chart3.component';

describe('InteractiveChart3Component', () => {
  let component: InteractiveChart3Component;
  let fixture: ComponentFixture<InteractiveChart3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveChart3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveChart3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
