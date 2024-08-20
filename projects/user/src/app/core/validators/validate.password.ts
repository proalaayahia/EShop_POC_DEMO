import { AbstractControl, ValidatorFn } from "@angular/forms";

export function ValidatePassword(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let messageValidate = { pass: { notMatch: '' } }
    let regex: RegExp
    if (control.value !== '' && control.value?.length > 5) {
      regex = new RegExp('[a-z]');
      if (!regex.test(control.value)) {
        messageValidate.pass.notMatch = $localize`password must contains at least one small letter.`;
        return { validPass: true, message: messageValidate.pass.notMatch };
      }
      regex = new RegExp('[A-Z]');
      if (!regex.test(control.value)) {
        messageValidate.pass.notMatch = $localize`password must contains at least one capital letter.`;
        return { validPass: true, message: messageValidate.pass.notMatch };
      }
      regex = new RegExp('[~!@#$%^&*()+<>{}]');
      if (!regex.test(control.value)) {
        messageValidate.pass.notMatch = $localize`password must contains at least one unified letter.`;
        return { validPass: true, message: messageValidate.pass.notMatch };
      }
      regex = new RegExp('[0-9]');
      if (!regex.test(control.value)) {
        messageValidate.pass.notMatch = $localize`password must contains a number at least .`;
        return { validPass: true, message: messageValidate.pass.notMatch };
      }
    }
    return null;
  }
}
