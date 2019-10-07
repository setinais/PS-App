import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";
import {NativeScriptFormsModule} from "nativescript-angular";
import {PerfilModule} from "~/app/perfil/perfil.module";
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { VisualizacoesComponent } from './visualizacoes/visualizacoes.component';
import {InputMaskModule} from "nativescript-input-mask/angular";
import {TokenInterceptor} from "~/app/interceptor/intercptor";
import { DiarioSaudeComponent } from './diario-saude/diario-saude.component';
import {NativeScriptUICalendarModule} from "nativescript-ui-calendar/angular";


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
    ],
    declarations: [
        AppComponent,
        IndexComponent,
        LoginComponent,
        HomeComponent,
        VisualizacoesComponent,
        DiarioSaudeComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
