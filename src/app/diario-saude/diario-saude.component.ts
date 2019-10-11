import {Component, OnInit} from '@angular/core';
import * as calendarModule from "nativescript-ui-calendar";
import {Color} from "tns-core-modules/color";

@Component({
  selector: 'ns-diario-saude',
  templateUrl: './diario-saude.component.html',
  styleUrls: ['./diario-saude.component.css']
})
export class DiarioSaudeComponent implements OnInit {
    calendarEvents = [];

    constructor() {
        let events = [];
        let now = new Date();
        let startDate;
        let endDate;
        let colors = [
            new Color(200, 188, 26, 214),
            new Color(220, 255, 109, 130),
            new Color(255, 55, 45, 255),
            new Color(199, 17, 227, 10),
            new Color(255, 255, 54, 3)
        ];
        for (let i = 1; i < 10; i++) {
            startDate = new Date(now.getFullYear(), now.getMonth(), i * 2, 1);
            endDate = new Date(now.getFullYear(), now.getMonth(), (i * 2), 3);
            let event = new calendarModule.CalendarEvent("event " + i,
                startDate,
                endDate,
                false,
                (colors[i * 10 % (colors.length - 1)]));
            events.push(event);
        }
        this.calendarEvents = events;
    }

    ngOnInit() {
    }

    onDateSelected(args) {
        console.log("onDateSelected: " + args.date);
    }

    onDateDeselected(args) {
        console.log("onDateDeselected: " + args.date);
    }

    onNavigatedToDate(args) {
        console.log("onNavigatedToDate: " + args.date);
    }

    onNavigatingToDateStarted(args) {
        console.log("onNavigatingToDateStarted: " + args.date);
    }

    onViewModeChanged(args) {
        console.log("onViewModeChanged: " + args.newValue);
    }

}
