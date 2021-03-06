import {Component, ElementRef, ViewChild} from "@angular/core";
import {alert} from "tns-core-modules/ui/dialogs";
import {Page} from "tns-core-modules/ui/page";
import {RouterExtensions} from "nativescript-angular/router";
import {AuthService} from "~/services/auth.service";
import {CredentialsModel} from "~/models/credentials.model";
import {client_id, client_secret, url_api} from "~/configs/url-default";
import {getString, setString} from "tns-core-modules/application-settings";
import * as utils from "tns-core-modules/utils/utils";
import { UserService } from "~/services/user.service";
import { isNull } from "@angular/compiler/src/output/output_ast";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    isLoggingIn = true;
    processing = false;
    credentials: CredentialsModel
    @ViewChild("password", {static: false}) password: ElementRef;
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef;
    @ViewChild("cpf", {static: false}) cpf: ElementRef;

    url_equeci_senha: string

    constructor(private authService: AuthService, private page: Page, private routeExtension: RouterExtensions, private userService: UserService){
        this.page.actionBarHidden = true
        this.credentials = new CredentialsModel()
        this.credentials.client_id = client_id
        this.credentials.client_secret = client_secret
        this.credentials.grant_type = "password"
        this.url_equeci_senha = url_api+'password/reset'
    }

    submit() {
        if (!this.credentials.username || !this.credentials.password) {
            this.alert("Por favor preencha o e-mail e a senha!");
            return;
        }
        this.processing = true
        this.login()
    }

    login() {
        this.authService.getToken(this.credentials)
            .subscribe(response => {
                this.processing = false
                this.userService.show(0).subscribe( res => {
                    if(res['data'].id === undefined) {
                        this.alert('N??o foi poss??vel obter suas informa????es, tente novamente!')
                    } else {
                        setString("user_id", (res['data'].id).toString())
                        this.go()
                    }
                })
            }, error => {
                if(error.status == 422){
                    this.alert(error.error['message'])
                }else if(error.status == 401){
                    this.alert('E-mail ou senha invalidos!')
                }else{
                    this.alert("Falha de conex??o, tente novamente!")
                }
                this.processing = false
            })
    }

    focusPassword() {
        //his.password.nativeElement.focus();
    }
    go(){
        this.routeExtension.navigate(['home'],{
            clearHistory: true,
            animated: true,
            transition: {
                name: 'slideTop',
                duration: 1000,
                curve: 'ease'
            }
        })
    }
    alert(message: string) {
        return alert({
            title: "Aten????o",
            okButtonText: "OK",
            message: message
        });
    }

    esqueceuSenha(){
        utils.openUrl(this.url_equeci_senha)
    }

}

