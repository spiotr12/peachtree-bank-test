import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';


/**
 * Main component
 */
@Component({
  selector: 'pbt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  @HostBinding('class.pbt-root')
  private readonly mainCSSClass = true;
}
