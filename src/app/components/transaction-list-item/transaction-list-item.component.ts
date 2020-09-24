import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';


@Component({
  selector: 'pbt-transaction-list-item',
  templateUrl: './transaction-list-item.component.html',
  styleUrls: ['./transaction-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListItemComponent {

  @Input()
  public color: string;

  @Input()
  public date: Date;

  @Input()
  public image: string;

  @Input()
  public beneficiary: string;

  @Input()
  public paymentType: string;

  @Input()
  public amount: number;

  @HostBinding('class.pbt-transaction-list-item')
  private readonly mainCSSClass = true;

  constructor() { }

}
