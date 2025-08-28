import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from '../../header-user/header-user.component';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../../common/user';
import { UserType } from '../../../common/user-type';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  imports: [HeaderUserComponent, FormsModule],
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent implements OnInit {
  id!: number;
  userName!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  address!: string;
  cellphone!: string;
  password!: string;
  userType!: string;

  ngOnInit(): void {}

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toast: ToastrService
  ) {}

  public register() {
    this.userName = this.email;
    this.userType = UserType.USER;
    let user = new User(
      this.id,
      this.userName,
      this.firstName,
      this.lastName,
      this.email,
      this.address,
      this.cellphone,
      this.password,
      this.userType
    );
    this.authenticationService.register(user).subscribe((data) => {
      this.toast.success('Sucessfully registered user', 'User');
      console.log(data);
    });
    console.log(user);
    this.router.navigate(['user/login']);
  }
}
