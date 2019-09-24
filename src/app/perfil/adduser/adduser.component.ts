import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Visibility} from "tns-core-modules/ui/enums";
import {GridLayout} from "tns-core-modules/ui/layouts/grid-layout";
import {UserModel, UserValidator} from "~/app/models/user.model";
import {EventData, Page} from "tns-core-modules/ui/page";
import {UserService} from "~/app/services/user.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {RouterExtensions} from "nativescript-angular";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import {Switch} from "tns-core-modules/ui/switch";

@Component({
    selector: 'ns-adduser',
    templateUrl: './adduser.component.html',
    styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

    private selectDate: GridLayout
    private overGrid: GridLayout
    processing: boolean

    @ViewChild("password", {static: false}) password: ElementRef
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef
    @ViewChild("name", {static: false}) nome: ElementRef
    @ViewChild("cpf", {static: false}) cpf: ElementRef
    @ViewChild("data_nascimento", {static: false}) dataNascimento: ElementRef

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
        console.log(this.formUser.value)
        this.userService.store(this.formUser.value).subscribe(response => {
            this.processing = false
            this.next();
        }, error => {
            this.processing = false
            if (error.status == 422) {
                this.formUserValidator = error.error['errors']
                console.log(error.error)
            } else {
                this.alert(error.error, 'Atenção')
            }
        })
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

    alert(message: string, title: string) {
        return alert({
            title: title,
            okButtonText: "OK",
            message: message
        });
    }

    next() {
        this.routeExtension.back()
    }

    prepareForm(){
        this.formUser = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            name: ['', Validators.required],
            cpf: ['', Validators.required],
            data_nascimento: ['', Validators.required],
            sexo: ['Masculino', Validators.required],
            cartao_sus: ['', Validators.required],
        })
    }

    onExtracaoValorAlterado(args){
        this.formUser.get('cpf').setValue(args.value)
    }

    onExtracaoValorDN(args){
        let dia = args.value.split("/")[0]
        let mes = args.value.split("/")[1]
        let ano = args.value.split("/")[2]

        this.formUser.get('data_nascimento').setValue(ano+'-'+mes+'-'+dia)

    }
    onChangeSexo(args: EventData){
        let bool = args.object as Switch;
        if(!bool.checked){
            this.formUser.get('sexo').setValue('Masculino')
        }else {
            this.formUser.get('sexo').setValue('Feminino')
        }
    }
}
