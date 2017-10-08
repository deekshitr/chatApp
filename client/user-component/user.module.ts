import { NgModule }      from "@angular/core";
import {RouterModule}	from "@angular/router";
import { CommonModule } from "@angular/common";
import { userComponent }  from "./user.component";

@NgModule({
    imports:      [ CommonModule, RouterModule],
    declarations: [ userComponent ],
    exports: 	  [ userComponent ]
})

export class UserModule {}
