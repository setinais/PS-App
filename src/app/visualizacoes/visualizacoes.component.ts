import { Component, OnInit } from '@angular/core';
import {VisualizacaoModel} from "~/app/models/visualizacao.model";
import {Page} from "tns-core-modules/ui/page";
import {RouterExtensions} from "nativescript-angular";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";

@Component({
    selector: 'ns-visualizacoes',
    templateUrl: './visualizacoes.component.html',
    styleUrls: ['./visualizacoes.component.css']
})
export class VisualizacoesComponent implements OnInit {

    private dados: Array<VisualizacaoModel>
    private type: string
    constructor(private page: Page,
                private _router: RouterExtensions,
                private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        // this.type = this.route.snapshot.queryParams['type']
        // alert(this.type)
    }

}
