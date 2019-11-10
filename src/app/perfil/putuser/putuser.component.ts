import {Component, OnInit} from '@angular/core';
import {UserModel, UserValidator} from "~/models/user.model";
import {EventData, Page} from "tns-core-modules/ui/page";
import {UserService} from "~/services/user.service";
import {RouterExtensions} from "nativescript-angular";
import {Switch} from "tns-core-modules/ui/switch";
import {AuthService} from "~/services/auth.service";

@Component({
    selector: 'ns-putuser',
    templateUrl: './putuser.component.html',
    styleUrls: ['./putuser.component.css']
})
export class PutuserComponent implements OnInit {


    userOld: any
    user: UserModel
    formUserValidator: UserValidator
    processing: boolean
    alterStatus: boolean = false
    Editar: string = 'Editar'
    checkedSwitch: boolean
    cpfextraido: string
    dataextraido: string
    sexo: string
    reload: boolean
    constructor(private page: Page,
                private userService: UserService,
                private routeExtension: RouterExtensions,
                private authService: AuthService) {
        this.user = new UserModel()
        this.processing = true
        this.reload = false
        this.user.sexo = 'Masculino'
        this.checkedSwitch = false
        this.page.actionBarHidden = !this.page.actionBarHidden
    }

    ngOnInit() {
        this.start()
    }
    start(){
        this.reload = true
        this.userService.show(0).subscribe(response => {
            this.userOld = response['data']
            this.prepareForm(response['data'])
            this.processing = false
        }, error => {
            this.processing = false
            this.alterStatus = false
            this.reload = false
        })
    }
    edit() {
        this.alterStatus = true
    }

    cancelEdit(){
        this.alterStatus = false
    }

    checkAlter() {
        this.alterStatus = false
        if (this.user.email == this.userOld['email'])
            this.user.email = undefined
        if (this.dataextraido == this.userOld['data_nascimento']) {
            this.user.data_nascimento = undefined
        } else {
            this.user.data_nascimento = this.dataextraido
        }
        if (this.user.sexo == this.userOld['sexo'])
            this.user.sexo = undefined
        if (this.user.cartao_sus == this.userOld['cartao_sus'])
            this.user.cartao_sus = undefined
        if (this.user.cpf == this.userOld['cpf']) {
            this.user.cpf = undefined
        } else {
            this.user.cpf = this.cpfextraido
        }
        this.submit()
    }

    submit() {
        this.userService.put(this.user, this.userOld['id']).subscribe(response => {
            this.Editar = "Editar"
            this.userOld = response['data']
            this.prepareForm(response['data'])
            this.processing = false
            this.formUserValidator = undefined
        }, error => {
            if (error.status == 422) {
                this.formUserValidator = error.error['errors']
            } else {
                alert(error.error['message'])
            }
            this.prepareForm(this.userOld)
            this.processing = false
            this.alterStatus = true
        })
    }

    prepareForm(response) {
        let ano = '0000'
        let mes = '00'
        let dia = '00'
        if(response['data_nascimento'] != null){
            ano = response['data_nascimento'].split("-")[0]
            mes = response['data_nascimento'].split("-")[1]
            dia = response['data_nascimento'].split("-")[2]
        }
        if(response['sexo'] == null){
            response['sexo'] ='Selecione'
            this.checkedSwitch = false
        }else{
            if (response['sexo'] == 'Masculino') {
                this.checkedSwitch = false
            } else {
                this.checkedSwitch = true
            }
        }
        this.user.email = response['email']
        this.user.name = response['name']
        this.user.cpf = response['cpf']
        this.user.cartao_sus = response['cartao_sus']
        this.user.sexo = response['sexo']
        this.user.data_nascimento = dia + '/' + mes + '/' + ano

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
            this.user.sexo = 'Masculino'
        } else {
            this.checkedSwitch = true
            this.user.sexo = 'Feminino'
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

