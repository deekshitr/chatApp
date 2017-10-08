"use strict";
exports.__esModule = true;
var router_1 = require("@angular/router");
var index_1 = require("./user-component/index");
var index_2 = require("./message-component/index");
exports.appRoutes = index_1.userRoutes.concat(index_2.messageComponentRoutes);
exports.appRoutingProviders = [router_1.provideRouter(exports.appRoutes)];
exports.routing = router_1.RouterModule.forRoot(exports.appRoutes);
