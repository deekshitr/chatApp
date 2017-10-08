import { Routes, RouterModule, provideRouter } from "@angular/router";

import { userRoutes }  from "./user-component/index";

import { messageComponentRoutes }  from "./message-component/index";

import {ModuleWithProviders} from "@angular/core";

export const appRoutes: Routes = [
    ...userRoutes,
    ...messageComponentRoutes
];

export const appRoutingProviders: any[] = [ provideRouter(appRoutes) ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
