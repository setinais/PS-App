import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: "modal",
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    private text: string
    private endereco: string = ''
    private bairro: string = ''
    private image: any
    constructor(private params: ModalDialogParams) {
        this.text = this.params.context.text
        this.image = this.params.context.image
        this.endereco = this.params.context.endereco
        this.bairro = this.params.context.bairro
    }

    ngOnInit() {}

    close() {
        this.params.closeCallback();
    }
}
