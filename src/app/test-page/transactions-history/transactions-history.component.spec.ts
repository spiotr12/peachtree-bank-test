import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsHistoryComponent } from './transactions-history.component';
import { provideMockStore } from '@ngrx/store/testing';


describe('TransactionsHistoryComponent', () => {
  let component: TransactionsHistoryComponent;
  let fixture: ComponentFixture<TransactionsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsHistoryComponent],
      providers: [
        provideMockStore(),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
