import {Component, OnInit} from '@angular/core';
import {Page} from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private page: Page) {
      this.page.actionBarHidden = !this.page.actionBarHidden
  }

  ngOnInit() {
  }


}
