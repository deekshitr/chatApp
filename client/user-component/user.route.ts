import {Router, RouterConfig, Routes} from "@angular/router";

import {userComponent} from "./user.component";

import * as myGlobal from "../service/global";

export const userRoutes: Routes = [
    { path: '', component: userComponent }
];