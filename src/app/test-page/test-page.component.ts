import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services';
import { Store } from '@ngrx/store';
import { AppActions } from 'src/app/+state';


/**
 * The main component for this test project
 */
@Component({
  selector: 'pbt-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPageComponent implements OnInit {

  @HostBinding('class.pbt-test-page')
  private readonly mainCSSClass = true;

  constructor(private transactionService: TransactionService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.transactionService.getTransactions()
      .subscribe((transactions) => {
        this.store.dispatch(AppActions.loadTransactions({ transactions }));
      });
  }

}
