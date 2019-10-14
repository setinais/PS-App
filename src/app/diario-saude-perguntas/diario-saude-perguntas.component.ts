import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';

@Component({
  selector: 'ns-diario-saude-perguntas',
  templateUrl: './diario-saude-perguntas.component.html',
  styleUrls: ['./diario-saude-perguntas.component.css']
})
export class DiarioSaudePerguntasComponent implements OnInit {

  public perguntas: Array<any> = [];

  public clickedArray: Array<any> = [];

  @ViewChild('CB1', {static: false}) FirstCheckBox: ElementRef;

  constructor(private routerExtenstions: RouterExtensions) {
    this.perguntas = [
      {
          categoria: 'Geral e Inespecifico',
          tipos:
              [
                { name: 'Alergia / Reação Alérgica'}, 
                { name: 'Arrepios / Calafrios'},
                { name: 'Conjutivite'},
                { name: 'Desmaio'},
                { name: 'Dor de cabeça'},
                { name: 'Dor de ouvido/ Zumbido'},
                { name: 'Dor generalizada / Múltipla'},
                { name: 'Dores no peito / Tórax'},
                { name: 'Febre'},
                { name: 'Inchaço'},
                { name: 'Paralisia / Fraqueza'},
                { name: 'Pressão alta'},
                { name: 'Sangramento / Hemorragia'},
                { name: 'Tontura'},
              ]
      },
      {
        categoria: 'Digestivo',
        tipos:
              [
                { name: 'Diarreia / Prisão de ventre' }, 
                { name: 'Dor abdominal / Cólicas' },
                { name: 'Dor anal / Retal' },
                { name: 'Náuseas ou vômitos' },
                { name: 'Sangue nas fezes' },
                { name: 'Vómito com sangue' },
              ]
      },
      {
        categoria: 'Psicológico',
        tipos:  
              [
                { name: 'Abuso de cigarros' }, 
                { name: 'Abuso de medicamentos' },
                { name: 'Abuso de álcool' },
                { name: 'Ansiedade / Nervosismo / Tensão' },
                { name: 'Estresse agudo' },
                { name: 'Irritação / Zandago (a)' },
                { name: 'Perturbação do sono' },
                { name: 'Tristeza / Sensação de depressão' },                
              ]
      },
      {
        categoria: 'Problemas respiratórios',
        tipos:  
              [
                { name: 'Asma' }, 
                { name: 'Bronquite' },
                { name: 'Dificuldade de respirar / Falta de ar' },
                { name: 'Sangramento nasal' },
                { name: 'Tosse persistente' },               
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
  this.routerExtenstions.navigate(['/home']);
}

}
