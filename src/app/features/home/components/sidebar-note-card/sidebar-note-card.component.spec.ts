import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNoteCardComponent } from './sidebar-note-card.component';

describe('SidebarNoteCardComponent', () => {
  let component: SidebarNoteCardComponent;
  let fixture: ComponentFixture<SidebarNoteCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarNoteCardComponent]
    });
    fixture = TestBed.createComponent(SidebarNoteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
