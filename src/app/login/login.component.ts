import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = "" ;
  password = "" ;
  success = true;
  user$: Object;

  waht = {id:"1", yes:"no"}

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
  }
  
  registerName(value: string) {
    this.username = value;
  }
  
  registerPassword(value: string) {
    this.password = value;
  }


  login () {
    this.data.authenticate(
      {username:this.username,
        password:this.password}
        ).subscribe( response => {
          var user = new User(response.username,response.password,response.id);
          this.data.currentUserId = user.id;
          this.data.currentUser = user.username;

          this.router.navigateByUrl('/main/users')},
          response => {
            this.success = false;
            alert("Incorrect login")}
        )
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

