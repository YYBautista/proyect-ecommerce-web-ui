import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Observable } from 'rxjs';
import { Userdto } from '../common/userdto';
import { Jwtclient } from '../common/jwtclient';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url:string="http://localhost:5000/api/v1/auth/";

  constructor( private httpClient: HttpClient) { }

  public register (user: User):Observable<User>{

    return this.httpClient.post<User>(this.url + "register", user);

  }


  public login (userDto: Userdto):Observable<Jwtclient>{

    return this.httpClient.post<Jwtclient>(this.url + "login", userDto);

  }


}
