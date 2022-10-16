import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFundsHistoryComponent } from './transfer-funds-history.component';

describe('TransferFundsHistoryComponent', () => {
  let component: TransferFundsHistoryComponent;
  let fixture: ComponentFixture<TransferFundsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferFundsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferFundsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
