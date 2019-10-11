import {Component, NgModule} from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import {IndexComponent} from "~/app/index/index.component";
import {LoginComponent} from "~/app/login/login.component";
import {AppAuthGuard} from "~/app/app-auth-guard";
import {AdduserComponent} from "~/app/perfil/adduser/adduser.component";
import {HomeComponent} from "~/app/home/home.component";
import {PutuserComponent} from "~/app/perfil/putuser/putuser.component";
import {VisualizacoesComponent} from "~/app/visualizacoes/visualizacoes.component";
import {RedefinirSenhaComponent} from "~/app/perfil/redefinir-senha/redefinir-senha.component";
import {DiarioSaudeComponent} from "~/app/diario-saude/diario-saude.component";

const routes: Routes = [
    { path: "", redirectTo: "/diario", pathMatch: "full"},
    { path: "index", component: IndexComponent},
    { path: "login", component: LoginComponent },
    { path: "adduser", component: AdduserComponent },
    { path: "home", component: HomeComponent, canActivate: [AppAuthGuard]},
    { path: "putuser", component: PutuserComponent},
    { path: "visualizacao", component: VisualizacoesComponent},
    { path: "redefinirSenha", component: RedefinirSenhaComponent },
    { path: "diario", component: DiarioSaudeComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
