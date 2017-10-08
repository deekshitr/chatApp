"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var globalVars = require("../service/global");
var core_2 = require("@angular/core");
var http_service_1 = require("../service/http.service");
require("/socket.io/socket.io.js");
var userComponent = /** @class */ (function () {
    function userComponent(router, httpService) {
        this.httpService = httpService;
        this.username = null;
        this.router = router;
    }
    userComponent.prototype.submit = function (data) {
        var _this = this;
        console.log('data', data);
        if (data) {
            this.httpService.addUser(data).then(function (result) {
                if (result)
                    globalVars.socket = io({ query: "userName=" + _this.username });
                _this.router.navigate(["message"]);
            }, function (err) {
                console.log(err);
            });
        }
    };
    userComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "user-name",
            templateUrl: "user.component.html",
            providers: [http_service_1.HttpService]
        }),
        __param(0, core_2.Inject(router_1.Router))
    ], userComponent);
    return userComponent;
}());
exports.userComponent = userComponent;
