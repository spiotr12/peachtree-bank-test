import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';


/**
 * Panel component with header containing title and icon
 */
@Component({
  selector: 'pbt-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {

  /**
   * Title
   */
  @Input()
  public title: any;

  /**
   * Icon file
   */
  @Input()
  public icon: any;

  @HostBinding('class.pbt-panel')
  private readonly mainCSSClass = true;

  constructor() { }

}
