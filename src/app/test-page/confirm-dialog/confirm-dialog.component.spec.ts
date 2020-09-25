import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ParseAmountModule } from 'src/app/pipes/parse-amount';
import { ITransactionRecord } from 'src/app/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  const transaction = {
    transaction: {
      type: 'Type',
      creditDebitIndicator: 'DBIT',
      amountCurrency: { amount: 100 },
    },
    merchant: { name: 'Lego' },
  } as ITransactionRecord;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [ParseAmountModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: transaction },
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
