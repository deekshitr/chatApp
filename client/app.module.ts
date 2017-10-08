import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpModule } from '@angular/http';

import { appRoutes } from "./app.routing";
import { AppComponent } from "./app.component";

import { routing, appRoutingProviders } from "./app.routing";

import { UserModule }  from "./user-component/index";
import { MessageModule }  from "./message-component/index";

@NgModule({
  imports:      [ BrowserModule, FormsModule, routing, RouterModule, RouterModule.forRoot(appRoutes), UserModule, MessageModule],
  declarations: [ AppComponent ],
  providers: 	[ appRoutingProviders ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
