import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Token, User } from "./models";
import { HttpClient } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = "http://127.0.0.1:8000";

  constructor(private client: HttpClient) { }
  
  logIn(contact_info: string, password: string): Observable<Token> {
    return this.client.post<Token>(
      `${this.BASE_URL}/user/login/`,
      {contact_info, password}
    )
  }

  register(username: string, password: string, contact_info: string): Observable<any> {
    return this.client.post<any>(
     `${this.BASE_URL}/user/register/`,
     {username, password, contact_info} 
    )
  }

  getUser(id:number): Observable<User> {
    return this.client.get<User>(
      `${this.BASE_URL}/user/${id}/`
    );
  }
}
