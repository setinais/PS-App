import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DiarioSaude } from './diario.model';
import { Saude } from '../diario-saude/saude.model';
import { Tipo } from './tipo.model';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'ns-diario-saude-perguntas',
  templateUrl: './diario-saude-perguntas.component.html',
  styleUrls: ['./diario-saude-perguntas.component.css']
})
export class DiarioSaudePerguntasComponent implements OnInit {

  public perguntas: Array<DiarioSaude> = [];
  public clickedArray: Array<any> = [];
  form: FormGroup;
  @ViewChild('CB1', {static: false}) FirstCheckBox: ElementRef;

  constructor(private routerExtenstions: RouterExtensions,
              private fb: FormBuilder,
              private db: SqliteService) {
    this.perguntas = [
      {
          category: 'Geral e Inespecifico',
          tipos:
              [
                {status: false, name: 'Alergia / Reação Alérgica'}, 
                {status: false, name: 'Arrepios / Calafrios'},
                {status: false, name: 'Conjutivite'},
                {status: false, name: 'Desmaio'},
                {status: false, name: 'Dor de cabeça'},
                {status: false, name: 'Dor de ouvido/ Zumbido'},
                {status: false, name: 'Dor generalizada / Múltipla'},
                {status: false, name: 'Dores no peito / Tórax'},
                {status: false, name: 'Febre'},
                {status: false, name: 'Inchaço'},
                {status: false, name: 'Paralisia / Fraqueza'},
                {status: false, name: 'Pressão alta'},
                {status: false, name: 'Sangramento / Hemorragia'},
                {status: false, name: 'Tontura'},
              ]
      },
      {
        category: 'Digestivo',
        tipos:
              [
                {status: false, name: 'Diarreia / Prisão de ventre' }, 
                {status: false, name: 'Dor abdominal / Cólicas' },
                {status: false, name: 'Dor anal / Retal' },
                {status: false, name: 'Náuseas ou vômitos' },
                {status: false, name: 'Sangue nas fezes' },
                {status: false, name: 'Vómito com sangue' },
              ]
      },
      {
        category: 'Psicológico',
        tipos:  
              [
                {status: false, name: 'Abuso de cigarros' }, 
                {status: false, name: 'Abuso de medicamentos' },
                {status: false, name: 'Abuso de álcool' },
                {status: false, name: 'Ansiedade / Nervosismo / Tensão' },
                {status: false, name: 'Estresse agudo' },
                {status: false, name: 'Irritação / Zandago (a)' },
                {status: false, name: 'Perturbação do sono' },
                {status: false, name: 'Tristeza / Sensação de depressão' },                
              ]
      },
      {
        category: 'Problemas respiratórios',
        tipos:  
              [
                {status: false, name: 'Asma' }, 
                {status: false, name: 'Bronquite' },
                {status: false, name: 'Dificuldade de respirar / Falta de ar' },
                {status: false, name: 'Sangramento nasal' },
                {status: false, name: 'Tosse persistente' },               
              ]
      }
  ]
   }

  ngOnInit() {  
  }

  clicked(tipo) {
    if (this.clickedArray.indexOf(tipo) != -1) {
        var index = this.clickedArray.indexOf(tipo)
        this.clickedArray.splice(index, 1)
    } else {
        this.clickedArray.push(tipo)
    }
}

public toggleCheck() {
  this.FirstCheckBox.nativeElement.toggle();
}

public getCheckProp() {
  console.log(
    'checked prop value = ' + this.FirstCheckBox.nativeElement.checked
  );
}

confirmarQuestionario() {
  // Imcompleto
  // this.routerExtenstions.navigate(['/home']);

  let tipos: Tipo[] = [];
  this.perguntas.forEach((pergunta, index) => {
    pergunta.tipos.forEach((value, index) => {
      value.category = pergunta.category;
      if (value.status) {
        tipos.push(value);
      }
    })
  })
  let date: Date = new Date();
  let saude: Saude = {
    id: null,
    name: 'Mal',
    day: date.getDate().toString(),
    month: date.getMonth().toString(),
    year: date.getFullYear().toString(),
    hours: date.getHours().toString(),
    minutes: date.getMinutes().toString(),
    tipos: tipos
  }
  this.db.insertSaudeDiaria(saude).then(res => this.routerExtenstions.navigate(['/home']));
}

}
