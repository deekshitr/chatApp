import { Component } from "@angular/core";
import * as globalVars from "../service/global";

import "/socket.io/socket.io.js";


@Component({
  selector: "message-page",
  templateUrl: "./message.component.html"
})

export class MessageComponent implements OnInit {
    selfReference: any;
    resFlag: boolean = false;
    newUser: boolean = false;
    exitedUser: boolean = false;
    newUserName: string = null;
    exitedUserName: string = null;
    sentMessageUsername: string = null;
    response: string;
    clientsNameList: number[];
    message: string;
    msgCount: number = 0;

    constructor() {
        let selfReference = this;
        let temp;
        globalVars.socket.on("broadcastToAll_chatMessage", function(resObj) {            
            selfReference.msgCount++;
            if (selfReference.sentMessageUsername !== resObj.name) {
                resObj.name = resObj.name + ": ";
                temp = $("#messages").length;
                console.log("ul length : ", temp);
                console.log(selfReference.msgCount);
                $("#messages").append($("<li data-index=" + selfReference.msgCount + ">"));
                $("li[data-index=" + selfReference.msgCount + "]").append($("<div class='left-msg' data-index=" + selfReference.msgCount + ">"));
                $("div[data-index=" + selfReference.msgCount + "]").append($("<span class='name'>").text(resObj.name));
                $("div[data-index=" + selfReference.msgCount + "]").append($("<span class='msg'>").text(resObj.msg));
                $("#messages").append($("<br>"));

            }
            else if (selfReference.sentMessageUsername === resObj.name) {
                $("#messages").append($("<li data-index=" + selfReference.msgCount + ">"));
                $("li[data-index=" + selfReference.msgCount + "]").append($("<div class='right-msg' data-index=" + selfReference.msgCount + ">"));
                $("div[data-index=" + selfReference.msgCount + "]").append($("<span class='msg'>").text(resObj.msg));
                 $("#messages").append($("<br>"));
                selfReference.sentMessageUsername = null;
            }
        });

        globalVars.socket.on("updateSocketList", function(list){
          selfReference.clientsNameList = list;
        });

        globalVars.socket.on("addUserToSocketList", function(username){
            selfReference.exitedUser = false;
            selfReference.newUser = true;
            selfReference.newUserName = username;
        });

        globalVars.socket.on("removeUserFromSocketList", function(username){
            selfReference.newUser = false;
            selfReference.exitedUser = true;
            selfReference.exitedUserName = username;
        });
    }

    ngOnInit() {
        this.httpService.getUser(data).then((result) =>  {
          if(result){
            console.log("result",result);
          }
                          
        }, (err) => {
            console.log(err)
          });
      
    }

    sendMessage(data) {
        this.resFlag = true;
        let selfReference = this;
        globalVars.socket.emit("chatMessageToSocketServer", data.value, function(respMsg, username){
            selfReference.sentMessageUsername = username;
            selfReference.response = respMsg;
        });
        $("#message-boxID").val(" ");
    }
}