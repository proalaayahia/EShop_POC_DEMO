import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SharedModule } from '../../../Shared/shared.module';
import { MaterialModule } from '../../../Shared/material.module';
import { AuthService } from '../../../services/auth.service';
import { ILoginModel } from '../../../models/account/login.model';
// import { AsyncValidator } from 'src/app/validators/async.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnInit {
  // isAr: boolean = false
  hide = true
  loginForm!: FormGroup
  messages = {
    username: {
      required: $localize`username is required`,
      exist: $localize`username already exist`
    },
    password: {
      required: $localize`password is required`
    }
  }
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    })
  }
  get userName() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get isRemember() {
    return this.loginForm.get('rememberMe');
  }
  //*********************************Validation********************************* */
  userNameRequired() {
    return this.userName?.errors?.['required'] && (this.userName?.touched || this.userName?.dirty);
  }
  //password validation
  passwordRequired() {
    return this.password?.errors?.['required'] && (this.password?.touched || this.password?.dirty);
  }
  //submit button validation
  submitDisabledIf() {
    return this.loginForm.invalid || this.userName?.pending;
  }
  submit() {
    if (this.loginForm.invalid) {
      return null;
    }
    const loginData: ILoginModel = {
      username: this.userName?.value,
      password: this.password?.value,
      expiresInMins: this.isRemember?.value ? 60 : 30
    };
    let token = this.authService.login(loginData).subscribe({
      next: (result) => {
        console.log(result)
      },
      error: (err) => {
        console.log(err)
      }
    });
    return token;
  }
}
