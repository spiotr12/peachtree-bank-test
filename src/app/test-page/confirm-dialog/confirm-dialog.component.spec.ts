import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ParseAmountModule } from 'src/app/pipes/parse-amount';
import { ITransactionRecord } from 'src/app/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import createSpy = jasmine.createSpy;


class MockMatDialogRef {
  public close = createSpy();
}

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRef: MockMatDialogRef;

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
        { provide: MatDialogRef, useClass: MockMatDialogRef },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    dialogRef = TestBed.inject(MatDialogRef) as any;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('transfer', () => {
    it('should call close on dialogRef with true as param', () => {
      // Arrange
      // Act
      component.transfer();
      // Assert
      expect(dialogRef.close).toHaveBeenCalled();
      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
  });

  describe('cancel', () => {
    it('should call close on dialogRef with false as param', () => {
      // Arrange
      // Act
      component.cancel();
      // Assert
      expect(dialogRef.close).toHaveBeenCalled();
      expect(dialogRef.close).toHaveBeenCalledWith(false);
    });
  });
});
