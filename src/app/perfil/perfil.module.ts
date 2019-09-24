import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import {AdduserComponent} from "~/app/perfil/adduser/adduser.component";
import {NativeScriptFormsModule, NativeScriptRouterModule} from "nativescript-angular";
import {ReactiveFormsModule} from "@angular/forms";
import {InputMaskModule} from "nativescript-input-mask/angular";
import { PutuserComponent } from './putuser/putuser.component';


@NgModule({
  declarations: [
      AdduserComponent,
      PutuserComponent
  ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        ReactiveFormsModule,
        InputMaskModule,
    ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PerfilModule { }
