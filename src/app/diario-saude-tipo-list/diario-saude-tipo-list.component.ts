import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';
import { Tipo } from '../diario-saude-perguntas/tipo.model';

@Component({
  selector: 'ns-diario-saude-tipo-list',
  templateUrl: './diario-saude-tipo-list.component.html',
  styleUrls: ['./diario-saude-tipo-list.component.css']
})
export class DiarioSaudeTipoListComponent implements OnInit {

  saude_id: number;
  tipos: Tipo;
  constructor(private route: ActivatedRoute,
              private db: SqliteService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.saude_id = parseInt(params.get('id'));
      this.db.getTipos(this.saude_id).then(res => this.tipos = res)      
    })
  }

}
