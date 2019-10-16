import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ns-visualizacoes-detail',
  templateUrl: './visualizacoes-detail.component.html',
  styleUrls: ['./visualizacoes-detail.component.css']
})
export class VisualizacoesDetailComponent implements OnInit {

    private dados: any

  constructor(private route: ActivatedRoute) {
      this.dados = this.route.queryParams['_value']
      console.log(this.route.queryParams['_value'])
  }

  ngOnInit() {
  }

}
