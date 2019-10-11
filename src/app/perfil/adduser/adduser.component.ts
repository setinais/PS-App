import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserModel, UserValidator} from "~/models/user.model";
import {EventData, Page} from "tns-core-modules/ui/page";
import {UserService} from "~/services/user.service";
import {FormBuilder} from "@angular/forms";
import {RouterExtensions} from "nativescript-angular";
import {Switch} from "tns-core-modules/ui/switch";

@Component({
    selector: 'ns-adduser',
    templateUrl: './adduser.component.html',
    styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

    processing: boolean

    @ViewChild("password", {static: false}) password: ElementRef
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef
    @ViewChild("name", {static: false}) nome: ElementRef
    @ViewChild("cpf", {static: false}) cpf: ElementRef
    @ViewChild("data_nascimento", {static: false}) dataNascimento: ElementRef

    user: UserModel
    formUserValidator: UserValidator
    private cpfextraido: string
    private dataextraido: string
    private dataoriginal: string
    private checkedSwitch: boolean

    constructor(private page: Page,
                private userService: UserService,
                private routeExtension: RouterExtensions,
                private _fb: FormBuilder) {
        this.user = new UserModel()
        this.processing = false
        this.page.actionBarHidden = !this.page.actionBarHidden
        this.user.sexo = "Masculino"
        this.checkedSwitch = false
    }

    ngOnInit() {

    }

    submit() {
        this.processing = !this.processing;
        this.user.cpf = this.cpfextraido
        this.user.data_nascimento = this.dataextraido
        this.userService.store(this.user).subscribe(response => {
            this.processing = false
            alert('Cadastro realizado com Sucesso!')
            this.next();
        }, error => {
            this.processing = false
            if (error.status == 422) {
                this.user.data_nascimento = this.dataoriginal
                this.formUserValidator = error.error['errors']
            } else {
                console.log(error)
                this.alert(error.error, 'Atenção')
            }
        })
    }

    focusPassword() {
        this.password.nativeElement.focus();
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

    onExtracaoValorAlterado(args){
        this.cpfextraido = args.value
    }

    onExtracaoValorDN(args){
        let dia = args.value.split("/")[0]
        let mes = args.value.split("/")[1]
        let ano = args.value.split("/")[2]
        this.dataoriginal = args.value
        this.dataextraido = ano + '-' + mes + '-' + dia

    }
    onChangeSexo(args: EventData) {
        let bool = args.object as Switch;
        if (!bool.checked) {
            this.checkedSwitch = false
            this.user.sexo = 'Masculino'
        } else {
            this.checkedSwitch = true
            this.user.sexo = 'Feminino'
        }
    }
}
