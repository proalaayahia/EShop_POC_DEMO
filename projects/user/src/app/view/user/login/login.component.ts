import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
// import { AsyncValidator } from 'src/app/validators/async.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule,
    MatCheckboxModule, RouterModule,
    MatFormFieldModule, MatDividerModule, MatIconModule],
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
  url = 'https://jsonplaceholder.typicode.com/users/1'
  constructor(private fb: FormBuilder) { }

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
  submit() { }
}
