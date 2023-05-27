import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickInputFieldComponent } from './quick-input-field.component';

describe('QuickInputFieldComponent', () => {
  let component: QuickInputFieldComponent;
  let fixture: ComponentFixture<QuickInputFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickInputFieldComponent]
    });
    fixture = TestBed.createComponent(QuickInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
