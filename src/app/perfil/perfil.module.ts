import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import {AdduserComponent} from "~/app/perfil/adduser/adduser.component";
import {NativeScriptFormsModule, NativeScriptRouterModule} from "nativescript-angular";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
      AdduserComponent
  ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        ReactiveFormsModule
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PerfilModule { }
