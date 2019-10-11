import {Component, OnInit} from '@angular/core';
import {Page} from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    private isSelected: number
    private isselected: number

  constructor(private page: Page) {
      this.page.actionBarHidden = !this.page.actionBarHidden
  }

  ngOnInit() {
  }

}
