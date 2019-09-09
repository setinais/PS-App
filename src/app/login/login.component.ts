import { Component, ElementRef, ViewChild } from "@angular/core";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import {AuthService} from "~/app/services/auth.service";
import {CredentialsModel} from "~/app/models/credentials.model";
import {UserModel} from "~/app/models/user.model";
import {NavigationButton} from "tns-core-modules/ui/action-bar";
// import { User } from "../shared/user.model";
// import { UserService } from "../shared/user.service";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    minDate: Date = new Date(1920, 1, 1);
    maxDate: Date = new Date(2019, 1, 1);
    scrollEnabled: boolean = true;
    isLoggingIn = true;
    processing = false;
    user: UserModel
    credentials: CredentialsModel
    @ViewChild("password", {static: false}) password: ElementRef;
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef;
    @ViewChild("cpf", {static: false}) cpf: ElementRef;

    constructor(private authService: AuthService, private page: Page, private routeExtension: RouterExtensions){
        this.page.actionBarHidden = true
        this.credentials = new CredentialsModel()
        this.user = new UserModel()
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn
        this.page.actionBarHidden = !this.page.actionBarHidden
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
                alert("logado ok")
                this.processing = false
            }, error => {
                this.processing = false
                this.alert(error.error.message)
                })
    }

    focusPassword() {
        //his.password.nativeElement.focus();
    }

    alert(message: string) {
        return alert({
            title: "Atenção",
            okButtonText: "OK",
            message: message
        });
    }

}

