import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  type: string = "";
  logged: boolean = false;
  username: string = "";
  contact_info: string = "";
  password: string = "";
  newCategory: string = "";
  private helper = new JwtHelperService();
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    
  ) {
  }


  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.type = String(params.get("type"));
     })
    const access = localStorage.getItem("access");
    if (access) {
      this.logged = true;

    }
  }

  register() {
    this.userService
      .register(this.username, this.password, this.contact_info)
      .subscribe((data) =>
        console.log(data)
      )
  }

  login() {
    this.userService
      .logIn(this.contact_info, this.password)
      .subscribe((data) => {
        this.logged = true;
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
      })
  }

  logout() {
    this.logged = false;
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

}
