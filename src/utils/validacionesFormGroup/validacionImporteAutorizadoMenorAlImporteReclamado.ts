import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export const contrasenasIguales: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password') as FormControl;
    const repeated_password = group.get('repeated_password') as FormControl;

    return password.value === repeated_password.value ? null : { contrasenasIguales: true }
}