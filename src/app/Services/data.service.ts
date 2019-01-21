import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  temp: Object;
  currentUser: String;
  // currentUser = "Alice";
  // currentUserId: String;
  currentUserId = "1";
  currentConvo: String;
  currentReceiver: String;



  HOST = "http://localhost:8080/";

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get(this.HOST + "users")
  }

  getUser(userId) {
    return this.http.get(this.HOST+"user", {params:{
      userId: userId
    }})
    
  }

  getChats(userId) {
    return this.http.get(this.HOST + 'chats', {params: {userId:userId}})
  }

  getConvo(id): Observable<Message[]> {
    return this.http.get<Message[]>(this.HOST + 'chat',{params: {id:id}});
  }

  authenticate(credentials): Observable<User> {
    return this.http.get<User>(this.HOST + 'authenticate',{params: credentials})
  }

  sendMessage(message) {
    return this.http.post(this.HOST + 'message', message)
  }

  
}

export class User {
  public username: string;
  public password: string;
  public id: string;

  constructor(username: string, password: string, id: string) {
      this.username = username;
      this.password = password;
      this.id = id;
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
