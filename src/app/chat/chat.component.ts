import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message = "";
  currentUrl: String;
  messageResponse = [];
  
  constructor(private router: Router, private data : DataService) {
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
  }

  ngOnInit() {
    this.data.getConvo(this.currentUrl[this.currentUrl.length - 1]).subscribe(
      response => {
        response.forEach(item => {
          this.messageResponse.push(new Message(item.sender,item.receiver,item.body,item.order,item.convoId))
      })
  });
  }

  registerName = function (value: string) {
    this.message = value;
  }

  send = function () {
    this.data.sendMessage({
      sender: this.data.currentUser,
      receiver: "Bob",
      body: this.message,
      convoId: this.currentUrl[this.currentUrl.length - 1]
    }).subscribe(
      data => {this.messageResponse.push(data)
      console.warn(this.messageResponse)})
    }

}

export class Message {
  public sender: string;
  public receiver: string;
  public order: string;
  public body: string;
  public convoId: string;

  constructor(sender: string, receiver: string, body: string, order: string, convoId: string) {
      this.sender = sender;
      this.receiver = receiver;
      this.body = body
      this.order = order;
      this.convoId = convoId;
      
  }
}


export class Chat {
  public id: string;
  public messages: Message[];

  constructor(id: string, messages: Array<Message>) {
      this.id = id;
      this.messages = Array<Message>();   
  }
}

