import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Visibility} from "tns-core-modules/ui/enums";
import {GridLayout} from "tns-core-modules/ui/layouts/grid-layout";
import {UserModel} from "~/app/models/user.model";
import {Page} from "tns-core-modules/ui/page";

@Component({
    selector: 'ns-adduser',
    templateUrl: './adduser.component.html',
    styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

    minDate: Date = new Date(1920, 1, 1);
    maxDate: Date = new Date(2019, 1, 1);
    date: Date
    dataFormatBr: string

    private selectDate: GridLayout
    private overGrid: GridLayout
    processing: false

    @ViewChild("password", {static: false}) password: ElementRef
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef
    @ViewChild("nome", {static: false}) nome: ElementRef
    @ViewChild("cpf", {static: false}) cpf: ElementRef
    @ViewChild("data_nascimento", {static: false}) dataNascimento: ElementRef
    @ViewChild("sexo", {static: false}) sexo: ElementRef

    user: UserModel

    constructor(private page: Page,) {
        this.user = new UserModel()
    }

    ngOnInit() {
    }

    submit(){

    }

    onOpenSelectDate(){
        this.selectDate.visibility = <any>Visibility.visible
        this.selectDate.className = 'select-date animate-bounceInUp-delay-0ms'
        this.overGrid.animate({opacity: 0.5, duration: 300})
    }
    onDateChanged(args){}
    onCloseSelectDate(isCancel: boolean){}

    focusPassword() {
        this.password.nativeElement.focus();
    }
    focusConfirmPassword() {
        this.confirmPassword.nativeElement.focus();
    }
    focusNome() {
        this.nome.nativeElement.focus();
    }
    focusCpf() {
        this.cpf.nativeElement.focus();
    }
    focusDataNascimento() {
        this.dataNascimento.nativeElement.focus();
    }
    focusSexo() {
        this.sexo.nativeElement.focus();
    }
}
