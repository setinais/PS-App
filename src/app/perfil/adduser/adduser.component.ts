import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Visibility} from "tns-core-modules/ui/enums";
import {GridLayout} from "tns-core-modules/ui/layouts/grid-layout";
import {UserModel, UserValidator} from "~/app/models/user.model";
import {Page} from "tns-core-modules/ui/page";
import {UserService} from "~/app/services/user.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {RouterExtensions} from "nativescript-angular";

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
    processing: boolean

    @ViewChild("password", {static: false}) password: ElementRef
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef
    @ViewChild("nome", {static: false}) nome: ElementRef
    @ViewChild("cpf", {static: false}) cpf: ElementRef
    @ViewChild("data_nascimento", {static: false}) dataNascimento: ElementRef
    @ViewChild("sexo", {static: false}) sexo: ElementRef

    user: UserModel
    formUserValidator: UserValidator
    formUser: FormGroup

    constructor(private page: Page,
                private userService: UserService,
                private routeExtension: RouterExtensions,
                private _fb: FormBuilder) {
        this.user = new UserModel()
        this.processing = false
    }

    ngOnInit() {
        this.prepareForm()
    }

    submit() {
        this.processing = !this.processing;
        this.userService.store(this.formUser.value).subscribe(response => {
            this.processing = false
            this.next();
        }, error => {
            this.processing = false
            console.log(error.error)
            if (error.status == 422) {
                console.log(error.error.data)
                this.formUserValidator = error.error.data
            } else {
                this.alert(error.error.messagem, 'Atenção')
            }
        })
    }

    onOpenSelectDate() {
        this.selectDate.visibility = <any>Visibility.visible
        this.selectDate.className = 'select-date animate-bounceInUp-delay-0ms'
        this.overGrid.animate({opacity: 0.5, duration: 300})
    }

    onDateChanged(args) {
    }

    onCloseSelectDate(isCancel: boolean) {
    }

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

    alert(message: string, title: string) {
        return alert({
            title: title,
            okButtonText: "OK",
            message: message
        });
    }

    next() {
        this.routeExtension.backToPreviousPage()
    }

    prepareForm(){
        this.formUser = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            name: ['', Validators.required],
            cpf: ['', Validators.required],
            data_nascimento: ['', Validators.required],
            sexo: ['', Validators.required],
            cartao_sus: ['', Validators.required],
        })
    }

}
