import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AsyncValidator } from '../../../core/validators/async.validator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatInputModule,MatButtonModule,
    MatFormFieldModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup
  messages =
    {
      email: {
        required: $localize`Email is required`,
        exist: $localize`Email is already exist`,
        match: $localize`email must match email pattern!`,
        pattern: $localize`Incorrect email pattern`
      }
    }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['',
        {
          validators: [Validators.required, Validators.email, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)],
          asyncValidators: [AsyncValidator('https://jsonplaceholder.typicode.com/users/2', 'email')],
          updateOn: 'blur'
        }
      ],
    })
  }
  onSubmit() {
  }

  get email() {
    return this.forgetPasswordForm.get('email');
  }
  //email validation
  emailExist() {
    return this.email?.errors?.['controlExist'];
  }
  emailRequired() {
    return this.email?.errors?.['required'] && (this.email?.touched || this.email?.dirty);
  }

  //submit button validation
  submitDisabledIf() {
    return this.forgetPasswordForm.invalid || this.email?.pending;
  }

}
