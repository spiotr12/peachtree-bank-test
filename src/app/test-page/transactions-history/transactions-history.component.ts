import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';


/**
 * Component that handles transactions history
 */
@Component({
  selector: 'pbt-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsHistoryComponent {

  @HostBinding('class.pbt-transactions-history')
  private readonly mainCSSClass = true;

  constructor() { }

}
