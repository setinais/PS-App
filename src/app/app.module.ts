import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import {ModalDialogService, NativeScriptFormsModule} from "nativescript-angular";
import { PerfilModule } from "~/app/perfil/perfil.module";
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { VisualizacoesComponent } from './visualizacoes/visualizacoes.component';
import { InputMaskModule } from "nativescript-input-mask/angular";
import { TokenInterceptor } from "~/interceptor/intercptor";
import { DiarioSaudeComponent } from './diario-saude/diario-saude.component';
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
import {LocalRiscoComponent} from './local-risco/local-risco.component';
import { DiarioSaudeDetalhesComponent } from "./diario-saude-detalhes/diario-saude-detalhes.component";
import { DiarioSaudePerguntasComponent } from "./diario-saude-perguntas/diario-saude-perguntas.component";
import { DiarioSaudeRespostasComponent } from "./diario-saude-respostas/diario-saude-respostas.component";
import { VisualizacoesDetailComponent } from './visualizacoes-detail/visualizacoes-detail.component';
import {ModalComponent} from "~/app/modal/modal.component";
import { LocalRiscoAddComponent } from './local-risco-add/local-risco-add.component';
import {NgShadowModule} from "nativescript-ng-shadow";
import { DiarioSaudeTipoListComponent } from './diario-saude-tipo-list/diario-saude-tipo-list.component';
import { AguaComponent } from './agua/agua.component';
import {FloatLabel} from "~/styles/float-label";
import {FloatLabelAgua} from "~/styles/float-label-agua";
import { PesoComponent } from './peso/peso.component';
import { AvaliacaoModalComponent } from './visualizacoes/avaliacao-modal/avaliacao-modal.component';


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        PerfilModule,
        HttpClientModule,
        InputMaskModule,
        NativeScriptUICalendarModule,
        NativeScriptUIListViewModule,
        TNSCheckBoxModule,
        NgShadowModule,

    ],
    declarations: [
        AppComponent,
        IndexComponent,
        LoginComponent,
        HomeComponent,
        ModalComponent,
        VisualizacoesComponent,
        DiarioSaudeComponent,
        LocalRiscoComponent,
        DiarioSaudeDetalhesComponent,
        DiarioSaudePerguntasComponent,
        DiarioSaudeRespostasComponent,
        LocalRiscoComponent,
        VisualizacoesDetailComponent,
        LocalRiscoAddComponent,
        DiarioSaudeTipoListComponent,
        AguaComponent,
        FloatLabelAgua,
        PesoComponent,
        AvaliacaoModalComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        ModalDialogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [ModalComponent, AvaliacaoModalComponent],
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
