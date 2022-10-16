import { FormGroup, FormControl } from '@angular/forms';

export default class ValidateForm {
  static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      }
      else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    });
  }

  ALPHA_NUMERIC_REGEX = "/^[a-zA-Z0-9_]*$/";
  ALPHA_NUMERIC_VALIDATION_ERROR = { alphaNumericError: 'only alpha numeric values are allowed' }
  static alphaNumericValidator(formGroup: FormGroup) {
  }
}