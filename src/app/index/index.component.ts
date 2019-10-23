import {Component, OnInit} from '@angular/core';
import {Page} from "tns-core-modules/ui/page";
import {getString} from "tns-core-modules/application-settings";
import {RouterExtensions} from "nativescript-angular";

@Component({
  selector: 'ns-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private page: Page, private routeExtension: RouterExtensions) {
      this.page.actionBarHidden = !this.page.actionBarHidden
      if(getString("token"))
          this.routeExtension.navigate(['/home'])
  }

  ngOnInit() {
  }


}
