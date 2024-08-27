import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ProductsModel } from "../../models/products.model";

@Component({
  selector: 'dialog-overview-example-dialog',
  standalone:true,
  imports:[MatFormFieldModule,MatDialogModule,MatInputModule,MatButtonModule],
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls:['dialog-overview-example-dialog.css']
})
export class DialogOverviewExampleDialog {

  form: FormGroup = new FormGroup({});
  flag: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ProductsModel, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  saveDetails(form: any) {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
