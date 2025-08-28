import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../../header-user/header-user.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Userdto } from '../../../common/userdto';
import { RouterLink } from '@angular/router';
import { SessionStorageService } from '../../../Services/session-storage.service';

@Component({
  selector: 'app-login',
  imports: [HeaderUserComponent, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  ngOnInit(): void {}

  constructor(
    private authenticationService: AuthenticationService,
    private sessionStorage: SessionStorageService
  ) {}

  public login() {
    let userDto = new Userdto(this.username, this.password);

    this.authenticationService.login(userDto).subscribe((token) => {
      this.sessionStorage.setItem('token', token);
      console.log('Login successful', token);
    });
    console.log(userDto);
  }
}
