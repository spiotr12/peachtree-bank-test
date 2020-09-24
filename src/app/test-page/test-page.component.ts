import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';


/**
 * The main component for this test project
 */
@Component({
  selector: 'pbt-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPageComponent {

  @HostBinding('class.pbt-test-page')
  private readonly mainCSSClass = true;

  constructor() { }

}
