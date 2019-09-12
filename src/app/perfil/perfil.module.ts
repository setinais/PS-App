import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import {AdduserComponent} from "~/app/perfil/adduser/adduser.component";
import {NativeScriptFormsModule, NativeScriptRouterModule} from "nativescript-angular";



@NgModule({
  declarations: [
      AdduserComponent
  ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PerfilModule { }
