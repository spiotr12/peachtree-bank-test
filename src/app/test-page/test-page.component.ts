import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


@Component({
  selector: 'pbt-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
