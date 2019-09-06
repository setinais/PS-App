import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {LoginComponent} from "~/app/login/login.component";
import {getString} from "tns-core-modules/application-settings";


@Injectable({
    providedIn: 'root'
})
export class AppAuthGuard implements CanActivate{

    constructor(private router: Router,
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
