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
import {HttpClientModule} from "@angular/common/http";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

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
    ],
    declarations: [
        AppComponent,
        IndexComponent,
        LoginComponent,
        HomeComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
