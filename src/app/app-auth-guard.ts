import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";
import {LoginComponent} from "~/app/login/login.component";
import {getString} from "tns-core-modules/application-settings";
import {RouterExtensions} from "nativescript-angular";


@Injectable({
    providedIn: 'root'
})
export class AppAuthGuard implements CanActivate{

    constructor(private router: RouterExtensions,
                private _loginService: LoginComponent) { }

    canActivate() {
        if (getString("token")) {
            return true
        } else {
            this.router.navigate(['/login'])
            return false
        }
    }
}
