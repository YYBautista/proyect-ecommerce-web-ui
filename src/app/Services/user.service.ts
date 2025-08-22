import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = 'http://localhost:5000/api/v1/users/';

  constructor(private httpClient: HttpClient) {}

  public getUserById(id: number): Observable<User> {
    // return this.httpClient.get<User>(this.url + '/createdUser/' + id);
    return this.httpClient.get<User>(`${this.url}userById/${id}`);
  }
}
