import { Component, OnInit } from '@angular/core';
import * as calendarModule from "nativescript-ui-calendar";
import {Color} from "tns-core-modules/color";
import { SqliteService } from '../services/sqlite.service';
import { Saude } from '../diario-saude/saude.model';
import { RouterExtensions } from 'nativescript-angular';
import { getString } from 'tns-core-modules/application-settings/application-settings';

@Component({
  selector: 'ns-diario-saude-detalhes',
  templateUrl: './diario-saude-detalhes.component.html',
  styleUrls: ['./diario-saude-detalhes.component.css']
})
export class DiarioSaudeDetalhesComponent implements OnInit {
    calendarEvents = [];
    historySaude: Saude[] = [];
    date: Date;

  constructor(private db: SqliteService,
              private routeExtensions: RouterExtensions) {
  }

  ngOnInit() {
    this.date = new Date();
    this.db.fetchSaudeDiaria( " month = " + (this.date.getMonth() + 1)+ " and year = " + this.date.getFullYear() + " and user_id = " + getString("user_id")).then(res => {
       this.historySaude = res;
       this.setCalendarEvent(this.historySaude)
   })
  }

  setCalendarEvent(saude: Saude[] = []) {
    let events = [];
    let now = new Date();
    let startDate;
    let endDate;
    let colors = [
        new Color("#e61919"),
        new Color("#F0F000")
    ];
    saude.forEach((value, index) => {
        startDate   =  new Date(parseInt(value.year), parseInt(value.month), parseInt(value.day), parseInt(value.hours), parseInt(value.minutes));
        endDate     = new Date(parseInt(value.year), parseInt(value.month), parseInt(value.day), parseInt(value.hours), parseInt(value.minutes));


        let event = new calendarModule.CalendarEvent(value.name,
        startDate,
        endDate,
        false,
        (value.name == "Mal" ? colors[0] : colors[1]));
        events.push(event)
    })
    this.calendarEvents=events;

  }

  listTipos(saude: Saude) {
      if(saude.name == "Mal") {
          this.routeExtensions.navigate(['/diario-saude-tipo-list', saude.id], {
            animated: true,
            transition: {
                name: 'slideLeft',
                curve: 'ease'
            }
          })
      }
  }

  onDateSelected(args) {
    // console.log("onDateSelected: " + args.date);
}

onDateDeselected(args) {
    // console.log("onDateDeselected: " + args.date);
}

onNavigatedToDate(args) {
    // console.log("onNavigatedToDate: " + args.date);
    // this.historySaude.splice(0,this.historySaude.length)
    this.historySaude = [];
    this.db.fetchSaudeDiaria(" month = " + (args.date.getMonth() + 1) + " and year = " + args.date.getFullYear() + " and user_id = " + getString("user_id")).then(res => {
        this.historySaude=res;
        this.setCalendarEvent(this.historySaude)
    });
}

onNavigatingToDateStarted(args) {
    // console.log("onNavigatingToDateStarted: " + args.date);

}


onViewModeChanged(args) {
    console.log("onViewModeChanged: " + args.newValue);
}

}
