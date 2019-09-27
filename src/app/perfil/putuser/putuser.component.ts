import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel, UserValidator} from "~/app/models/user.model";
import {EventData, Page} from "tns-core-modules/ui/page";
import {UserService} from "~/app/services/user.service";
import {RouterExtensions} from "nativescript-angular";
import {Switch} from "tns-core-modules/ui/switch";
import {AuthService} from "~/app/services/auth.service";

@Component({
    selector: 'ns-putuser',
    templateUrl: './putuser.component.html',
    styleUrls: ['./putuser.component.css']
})
export class PutuserComponent implements OnInit {


    userOld: any
    user: UserModel
    formUserValidator: UserValidator
    formUser: FormGroup
    processing: boolean
    alterStatus: boolean = false
    Editar: string = 'Editar'
    checkedSwitch: boolean
    cpfextraido: string
    dataextraido: string
    sexo: string

    constructor(private page: Page,
                private userService: UserService,
                private routeExtension: RouterExtensions,
                private _fb: FormBuilder,
                private authService: AuthService) {
        this.user = new UserModel()
        this.processing = true
        this.page.actionBarHidden = !this.page.actionBarHidden
    }

    ngOnInit() {
        this.userService.show(5).subscribe(response => {
            this.userOld = response['data']
            this.prepareForm(response['data'])
            this.processing = !this.processing
        }, error => {
            if (error.status == 500)
                alert(error.error['message'])
            this.processing = !this.processing
            this.alterStatus = !this.alterStatus
        })
    }

    edit() {
        this.alterStatus = !this.alterStatus
        if (this.Editar == "Salvar") {
            this.processing = !this.processing
            this.checkAlter()
        } else {
            this.Editar = "Salvar"
        }
    }

    checkAlter() {
        if (this.formUser.get('password').value == "")
            this.formUser.removeControl('password')
        if (this.formUser.get('email').value == this.userOld['email'])
            this.formUser.removeControl('email')
        if (this.dataextraido == this.userOld['data_nascimento']) {
            this.formUser.removeControl('data_nascimento')
        } else {
            this.formUser.get('data_nascimento').setValue(this.dataextraido)
        }
        if (this.formUser.get('sexo').value == this.userOld['sexo'])
            this.formUser.removeControl('sexo')
        if (this.formUser.get('cartao_sus').value == this.userOld['cartao_sus'])
            this.formUser.removeControl('cartao_sus')
        if (this.cpfextraido == this.userOld['cpf']) {
            this.formUser.removeControl('cpf')
        } else {
            this.formUser.get('cpf').setValue(this.cpfextraido)
        }
        this.submit()
    }

    submit() {
        console.log(this.formUser.value)
        this.userService.put(this.formUser.value, this.userOld['id']).subscribe(response => {
            this.Editar = "Editar"
            this.formUser.reset()
            this.userOld = response['data']
            this.prepareForm(response['data'])
            this.processing = !this.processing
            this.formUserValidator = undefined
            console.log('Test', response['data'])
        }, error => {
            if (error.status == 422) {
                this.formUserValidator = error.error['errors']
                console.log(error.error)
            } else {
                alert(error.error['message'])
            }
            this.formUser.reset()
            this.prepareForm(this.userOld)
            this.processing = !this.processing
            this.alterStatus = !this.alterStatus
        })
    }

    prepareForm(response) {
        console.log(response)
        let ano = response['data_nascimento'].split("-")[0]
        let mes = response['data_nascimento'].split("-")[1]
        let dia = response['data_nascimento'].split("-")[2]
        if (response['sexo'] == 'Masculino') {
            this.checkedSwitch = false
            this.sexo = 'Masculino'
        } else {
            this.checkedSwitch = true
            this.sexo = 'Feminino'
        }
        this.formUser = this._fb.group({
            email: [response['email'], Validators.required],
            password: ['', Validators.required],
            name: [response['name'], Validators.required],
            cpf: [response['cpf'], Validators.required],
            data_nascimento: [dia + '/' + mes + '/' + ano, Validators.required],
            sexo: [response['sexo'], Validators.required],
            cartao_sus: [response['cartao_sus'], Validators.required],
        })
    }

    onExtracaoValorAlterado(args) {
        this.cpfextraido = args.value
    }

    onExtracaoValorDN(args) {
        let dia = args.value.split("/")[0]
        let mes = args.value.split("/")[1]
        let ano = args.value.split("/")[2]

        this.dataextraido = ano + '-' + mes + '-' + dia

    }

    onChangeSexo(args: EventData) {
        let bool = args.object as Switch;
        if (!bool.checked) {
            this.checkedSwitch = false
            this.formUser.get('sexo').setValue('Masculino')
            this.sexo = 'Masculino'
        } else {
            this.checkedSwitch = true
            this.formUser.get('sexo').setValue('Feminino')
            this.sexo = 'Feminino'
        }
    }

    logout(){
        this.authService.logout()
        this.routeExtension.navigate(['login'],{
            clearHistory: true,
            animated: true,
            transition: {
                name: 'slideBottom',
                duration: 500,
                curve: 'ease'
            }
        })
    }

    delete(){
        this.userService.delete(this.userOld['id']).subscribe(response => {
            alert('Conta apagada com sucesso!')
            this.authService.logout()
            this.routeExtension.navigate(['login'],{
                clearHistory: true,
                animated: true,
                transition: {
                    name: 'slideBottom',
                    duration: 500,
                    curve: 'ease'
                }
            })
        }, error => {
            alert("Falha de comunicação com servidor!")
        })
    }
}

