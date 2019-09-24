import {Component, NgModule} from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import {IndexComponent} from "~/app/index/index.component";
import {LoginComponent} from "~/app/login/login.component";
import {AppAuthGuard} from "~/app/app-auth-guard";
import {AdduserComponent} from "~/app/perfil/adduser/adduser.component";
import {HomeComponent} from "~/app/home/home.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full"},
    { path: "index", component: IndexComponent},
    { path: "login", component: LoginComponent },
    { path: "adduser", component: AdduserComponent },
    { path: "home", component: HomeComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
