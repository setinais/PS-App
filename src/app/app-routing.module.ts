import {NgModule} from "@angular/core";
import {NativeScriptRouterModule} from "nativescript-angular/router";
import {Routes} from "@angular/router";
import {IndexComponent} from "~/app/index/index.component";
import {LoginComponent} from "~/app/login/login.component";
import {AppAuthGuard} from "~/app/app-auth-guard";
import {AdduserComponent} from "~/app/perfil/adduser/adduser.component";
import {HomeComponent} from "~/app/home/home.component";
import {PutuserComponent} from "~/app/perfil/putuser/putuser.component";
import {VisualizacoesComponent} from "~/app/visualizacoes/visualizacoes.component";
import {RedefinirSenhaComponent} from "~/app/perfil/redefinir-senha/redefinir-senha.component";
import {DiarioSaudeComponent} from "~/app/diario-saude/diario-saude.component";
import {LocalRiscoComponent} from "~/app/local-risco/local-risco.component";
import { DiarioSaudeDetalhesComponent } from "./diario-saude-detalhes/diario-saude-detalhes.component";
import { DiarioSaudePerguntasComponent } from "./diario-saude-perguntas/diario-saude-perguntas.component";
import {VisualizacoesDetailComponent} from "~/app/visualizacoes-detail/visualizacoes-detail.component";
import {LocalRiscoAddComponent} from "~/app/local-risco-add/local-risco-add.component";
import { DiarioSaudeTipoListComponent } from "./diario-saude-tipo-list/diario-saude-tipo-list.component";
import {AguaComponent} from "~/app/agua/agua.component";
import {PesoComponent} from "~/app/peso/peso.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full"},
    { path: "index", component: IndexComponent},
    { path: "login", component: LoginComponent },
    { path: "adduser", component: AdduserComponent },
    { path: "home", component: HomeComponent, canActivate: [AppAuthGuard]},
    { path: "putuser", component: PutuserComponent},
    { path: "visualizacao", component: VisualizacoesComponent},
    { path: "visualizacao-detail", component: VisualizacoesDetailComponent},
    { path: "redefinirSenha", component: RedefinirSenhaComponent },
    { path: "diario-saude", component: DiarioSaudeComponent, canActivate: [AppAuthGuard]},
    { path: "diario-saude-detalhes", component: DiarioSaudeDetalhesComponent, canActivate: [AppAuthGuard]},
    { path: "diario-saude-perguntas", component: DiarioSaudePerguntasComponent, canActivate: [AppAuthGuard]},
    { path: "diario-saude-tipo-list/:id", component: DiarioSaudeTipoListComponent, canActivate: [AppAuthGuard]},
    { path: "localrisco", component: LocalRiscoComponent },
    { path: "local-risco-add", component: LocalRiscoAddComponent },
    { path: "agua", component: AguaComponent },
    { path: "peso", component: PesoComponent },

];
@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
