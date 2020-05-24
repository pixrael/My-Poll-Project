import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatePollModalComponent } from './activate-poll-modal.component';

describe('ActivatePollModalComponent', () => {
  let component: ActivatePollModalComponent;
  let fixture: ComponentFixture<ActivatePollModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivatePollModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivatePollModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
