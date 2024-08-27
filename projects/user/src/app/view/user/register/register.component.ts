import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AsyncValidator } from '../../../core/validators/async.validator';
import { ValidatePassword } from '../../../core/validators/validate.password';
import Validation from '../../../core/validators/confirm.pssw.validator';
import { SharedModule } from '../../../Shared/shared.module';
import { MaterialModule } from '../../../Shared/material.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule,MaterialModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true
  show = true
  submitted: boolean = false
  registerForm!: FormGroup
  messages = {
    username: {
      required: $localize`username is required`,
      exist: $localize`username is already exists`,
      minlength: $localize`username minimum length is 6 characters`,
      maxlength: $localize`username maximum length is 15 characters`
    },
    email: {
      required: $localize`email is required`,
      exist: $localize`email is already exists`,
      match: $localize`email must match email pattern!`,
      pattern: $localize`incorrect email pattern`
    },
    password: {
      required: $localize`password is required`,
      minlength: $localize`password minimum length is 6 characters`,
      maxlength: $localize`password maximum length is 30 characters`
    },
    confirmPassword: {
      required: $localize`password confirmation is required`,
      match: $localize`password confirmation must match with your password`
    },
    acceptTerms: {
      required: $localize`Accept terms is required`,
    }
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['',
        {
          validators: [Validators.required, Validators.minLength(6), Validators.maxLength(15)],
          asyncValidators: [AsyncValidator('https://jsonplaceholder.typicode.com/users/2', 'username')],
          updateOn: 'blur'
        }
      ],
      email: ['',
        {
          validators: [Validators.required, Validators.email, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)],
          asyncValidators: [AsyncValidator('https://jsonplaceholder.typicode.com/users/2', 'email')],
          updateOn: 'blur'
        }
      ],
      password: ['',
        {
          validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30), ValidatePassword()]
        }],
      confirmPassword: ['',
        {
          validators: [Validators.required]
        }],
      acceptTerms: [false, { validators: [Validators.requiredTrue] }]
    }, { validators: [Validation.match('password', 'confirmPassword')] }
    )
  }
  onSubmit() {
    this.submitted = true
    this.registerForm.valid ? console.log(this.registerForm.value) : console.log(this.registerForm.errors)
  }
  get userName() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get acceptTerms() {
    return this.registerForm.get('acceptTerms');
  }
  //*************************************Validation***************************************** */
  //username validation
  userNameExist() {
    return this.userName?.errors?.['controlExist'];
  }
  userNameRequired() {
    return this.userName?.errors?.['required'] && (this.userName?.touched || this.userName?.dirty);
  }
  userNameMinLength() {
    return this.userName?.errors?.['minlength'] && (this.userName?.touched || this.userName?.dirty);
  }
  userNameMaxLength() {
    return this.userName?.errors?.['maxlength'] && (this.userName?.touched || this.userName?.dirty);
  }
  //email validation
  emailExist() {
    return this.email?.errors?.['controlExist'];
  }
  emailRequired() {
    return this.email?.errors?.['required'] && (this.email?.touched || this.email?.dirty);
  }
  //password validation
  passwordRequired() {
    return this.password?.errors?.['required'] && (this.password?.touched || this.password?.dirty);
  }
  passwordMinLength() {
    return this.password?.errors?.['minlength'] && (this.password?.touched || this.password?.dirty);
  }
  passwordMaxLength() {
    return this.password?.errors?.['maxlength'] && (this.password?.touched || this.password?.dirty);
  }
  validPassword() {
    return this.password?.errors?.['validPass'] && (this.password?.touched || this.password?.dirty);
  }
  //password confirmation validation
  confirmPasswordRequired() {
    return this.confirmPassword?.errors?.['required'] && (this.confirmPassword?.touched || this.confirmPassword?.dirty);
  }
  confirmPasswordMatch() {
    return this.confirmPassword?.errors?.['matching'] && (this.confirmPassword?.touched && this.confirmPassword?.dirty);
  }
  //terms acception validation
  acceptTermsRequired() {
    return this.submitted && this.acceptTerms?.errors
  }
  //submit button validation
  submitDisabledIf() {
    return this.registerForm.invalid || this.password?.invalid || this.email?.pending || this.userName?.pending;
  }
}
