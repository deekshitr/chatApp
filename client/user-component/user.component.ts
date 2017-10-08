import { Component } from "@angular/core";
import { Router }    from "@angular/router";
import * as globalVars from "../service/global";
import {Inject} from "@angular/core";
import { HttpService } from '../service/http.service';
import "/socket.io/socket.io.js";

@Component({
    selector: "user-name",
    templateUrl: "user.component.html",
    providers: [ HttpService ]
})

export class userComponent {
    username: string = null;
    protected router;
    constructor( @Inject(Router) router: Router,private httpService: HttpService) {
        this.router = router;
    }

    submit(data) {
      console.log('data',data);
      if (data) {
        this.httpService.addUser(data).then((result) =>  {
          if(result){
             globalVars.socket = io({ query: "userName=" + this.username });
              this.router.navigate(["message"]);
          }
                          
        }, (err) => {
            console.log(err)
          });
      }
    }
}