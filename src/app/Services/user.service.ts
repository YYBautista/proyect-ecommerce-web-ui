import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = 'http://localhost:5000/api/v1/users/';

  constructor(
    private httpClient: HttpClient,
    private headerService: HeaderService
  ) {}

  public getUserById(id: number): Observable<User> {
    // return this.httpClient.get<User>(this.url + '/createdUser/' + id);
    return this.httpClient.get<User>(`${this.url}userById/${id}`, {
      headers: this.headerService.headers,
    });
  }
}
