import { Component, OnInit } from '@angular/core';
import {LocalRiscoModel} from "~/models/local-risco.model";
import {RouterExtensions} from "nativescript-angular";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ns-local-risco-detail',
  templateUrl: './local-risco-detail.component.html',
  styleUrls: ['./local-risco-detail.component.css']
})
export class LocalRiscoDetailComponent implements OnInit {

    private detail: any

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.detail = this.route.queryParams['_value']
  }

}
