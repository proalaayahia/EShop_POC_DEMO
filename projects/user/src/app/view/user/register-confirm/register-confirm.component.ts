import { Component } from '@angular/core';

import { MaterialModule } from '../../../Shared/material.module';

@Component({
  selector: 'app-register-confirm',
  standalone:true,
  imports:[MaterialModule],
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent {
  constructor() { }

}
