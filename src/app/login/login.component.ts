import { Component, ElementRef, ViewChild } from "@angular/core";
import { alert } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import {AuthService} from "~/app/services/auth.service";
import {CredentialsModel} from "~/app/models/credentials.model";
import {client_id, client_secret} from "~/app/configs/url-default";
import {getString} from "tns-core-modules/application-settings";

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

    constructor(private authService: AuthService, private page: Page, private routeExtension: RouterExtensions){
        this.page.actionBarHidden = true
        this.credentials = new CredentialsModel()
        this.credentials.client_id = client_id
        this.credentials.client_secret = client_secret
        this.credentials.grant_type = "password"

        if(getString("token"))
            this.routeExtension.navigate(['/home'])
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
                this.go()

            }, error => {
                if(error.status == 422){
                    this.alert(error.error['message'])
                }else if(error.status == 401){
                    this.alert('E-mail ou senha invalidos!')
                }else{
                    this.alert("Falha de conexão, tente novamente!")
                }
                this.processing = false
                console.log(error)
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
            title: "Atenção",
            okButtonText: "OK",
            message: message
        });
    }



}

