import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Saude } from '../diario-saude/saude.model';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'ns-diario-saude-tipo-list',
  templateUrl: './diario-saude-tipo-list.component.html',
  styleUrls: ['./diario-saude-tipo-list.component.css']
})
export class DiarioSaudeTipoListComponent implements OnInit {

  saude_id: number;
  saude: Saude;
  constructor(private route: ActivatedRoute,
              private db: SqliteService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.saude_id = parseInt(params.get('id'));
      this.db.fetchSaudeDiaria(null, null, null, this.saude_id).then(res => this.saude = res[0])      
    })
  }

}
