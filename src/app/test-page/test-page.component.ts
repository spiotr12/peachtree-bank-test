import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';


@Component({
  selector: 'pbt-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPageComponent implements OnInit {

  @HostBinding('class.pbt-test-page')
  private readonly mainCSSClass = true;

  constructor() { }

  ngOnInit(): void {
  }

}
