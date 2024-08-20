import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import Validation from '../../../core/validators/confirm.pssw.validator';
import { ValidatePassword } from '../../../core/validators/validate.password';

@Component({
  selector: 'app-password-confirm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatDividerModule, MatIconModule],
  templateUrl: './password-confirm.component.html',
  styleUrls: ['./password-confirm.component.css']
})
export class PasswordConfirmComponent implements OnInit {

  hide = true
  show = true
  confirmPasswordForm!: FormGroup
  messages =
    {
      password: {
        required: $localize`password is required`,
        minlength: $localize`password minimum length is 6 characters`,
        maxlength: $localize`password maximum length is 30 characters`
      },
      confirmPassword: {
        required: $localize`password confirmation is required`,
        match: $localize`password confirmation must match with your password`
      }
    }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    this.confirmPasswordForm = this.fb.group({
      password: ['',
        {
          validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30), ValidatePassword()]
        }],
      confirmPassword: ['',
        {
          validators: [Validators.required]
        }]
    }, { validators: [Validation.match('password', 'confirmPassword')] })
  }
  onSubmit() {
  }

  get password() {
    return this.confirmPasswordForm.get('password');
  }
  get confirmPassword() {
    return this.confirmPasswordForm.get('confirmPassword');
  }
  //*************************************Validation***************************************** */
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
  //submit button validation
  submitDisabledIf() {
    return this.confirmPasswordForm.invalid || this.password?.invalid
  }
}
