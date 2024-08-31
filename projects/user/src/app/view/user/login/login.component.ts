import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { SharedModule } from '../../../Shared/shared.module';
import { MaterialModule } from '../../../Shared/material.module';
import { AuthService } from '../../../services/auth.service';
import { ILoginModel } from '../../../models/account/login.model';
import { StorageService } from '../../../services/storage.service';
// import { AsyncValidator } from 'src/app/validators/async.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // isAr: boolean = false
  hide = true
  loginForm!: FormGroup
  subscribtion!: Subscription
  redirect!: string
  messages = {
    username: {
      required: $localize`username is required`,
      exist: $localize`username already exist`
    },
    password: {
      required: $localize`password is required`
    }
  }
  storage = inject(StorageService)
  route = inject(ActivatedRoute);
  router = inject(Router)
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.subscribtion = this.route.queryParamMap.subscribe((q) => {
      this.redirect = q.get("redirect")!
    });
  }

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
    this.subscribtion = this.authService.login(loginData).subscribe({
      next: (result: TokenModel) => {
        if (result) {
          this.storage.Set('token', result.token)
          if (this.redirect) {
            const link = `/${this.redirect}`
            this.router.navigate([link])
          } else {
            this.router.navigate(['/home'])
          }
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
    return null;
  }
  ngOnDestroy(): void {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }
}

export interface TokenModel {
  token: string,
  refreshToken: string,
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string
}