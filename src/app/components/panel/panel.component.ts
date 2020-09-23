import { Component, HostBinding, Input, OnInit } from '@angular/core';


@Component({
  selector: 'pbt-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {

  @Input()
  public title: any;

  @Input()
  public icon: any;

  @HostBinding('class.pbt-panel')
  private readonly mainCSSClass = true;

  constructor() { }

  ngOnInit(): void {
  }

}
