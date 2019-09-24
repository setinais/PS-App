import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel, UserValidator} from "~/app/models/user.model";
import {EventData, Page} from "tns-core-modules/ui/page";
import {UserService} from "~/app/services/user.service";
import {RouterExtensions} from "nativescript-angular";
import {Switch} from "tns-core-modules/ui/switch";

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

    constructor(private page: Page,
                private userService: UserService,
                private routeExtension: RouterExtensions,
                private _fb: FormBuilder) {
        this.user = new UserModel()
        this.processing = false
    }

    ngOnInit() {
        this.userService.show(2).subscribe( response => {
            this.userOld = response['data']
            this.prepareForm(response)
        }, error => {
            if(error.status == 500)
                alert(error.error['message'])
        })
    }
    edit(){
        this.alterStatus = !this.alterStatus
        if(this.Editar == "Salvar"){
            this.processing = !this.processing
            this.checkAlter()
        }else{
            this.Editar = "Salvar"
        }
    }
    checkAlter(){
        if(this.formUser.get('password').value == "")
            this.formUser.removeControl('password')
        if(this.formUser.get('email').value == this.userOld['email'])
            this.formUser.removeControl('email')
        if(this.formUser.get('data_nascimento').value == this.userOld['data_nascimento'])
            this.formUser.removeControl('data_nascimento')
        if(this.formUser.get('sexo').value == this.userOld['sexo'])
            this.formUser.removeControl('sexo')
        if(this.formUser.get('cartao_sus').value == this.userOld['cartao_sus'])
            this.formUser.removeControl('cartao_sus')
        if(this.formUser.get('cpf').value == this.userOld['cpf'])
            this.formUser.removeControl('cpf')
        this.submit()
    }
    submit(){
        console.log(this.formUser.value)
        this.userService.put(this.formUser.value, this.userOld['id']).subscribe(response => {

            }, error => {
                if(error.status == 422){
                    //this.formUserValidator = error.error['errors']
                }else{
                    alert(error.error['message'])
                }
                this.processing = !this.processing
                this.alterStatus = !this.alterStatus
            })
    }
    prepareForm(response){
        let ano = response['data']['data_nascimento'].split("-")[0]
        let mes = response['data']['data_nascimento'].split("-")[1]
        let dia = response['data']['data_nascimento'].split("-")[2]
        if(response['data']['sexo'] == 'Masculino'){
            this.checkedSwitch = false
        }else{
            this.checkedSwitch = true
        }
        this.formUser = this._fb.group({
            email: [response['data']['email'], Validators.required],
            password: ['', Validators.required],
            name: [response['data']['name'], Validators.required],
            cpf: [response['data']['cpf'], Validators.required],
            data_nascimento: [ dia+'/'+mes+'/'+ano, Validators.required],
            sexo: [response['data']['sexo'], Validators.required],
            cartao_sus: [ response['data']['cartao_sus'], Validators.required],
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
            this.checkedSwitch = false
            this.formUser.get('sexo').setValue('Masculino')
        }else {
            this.checkedSwitch = true
            this.formUser.get('sexo').setValue('Feminino')
        }
    }
}
