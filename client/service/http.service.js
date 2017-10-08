"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var HttpService = /** @class */ (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.getAllMessages = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/api/users')
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    HttpService.prototype.addUser = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/api/users', data)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    HttpService = __decorate([
        core_1.Injectable()
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
