import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';


@Component({
  selector: 'pbt-sort-indicator',
  templateUrl: './sort-indicator.component.html',
  styleUrls: ['./sort-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortIndicatorComponent {

  @Input()
  public sort: number;

  @HostBinding('class.pbt-sort-indicator')
  private readonly mainCSSClass = true;

  constructor() { }

}
