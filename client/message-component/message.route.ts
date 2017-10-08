import {Router, Routes} from "@angular/router";

import {MessageComponent} from "./message.component";

import * as myGlobal from "../service/global";


export const messageComponentRoutes: Routes = [
    { path: 'message', component: MessageComponent }
];