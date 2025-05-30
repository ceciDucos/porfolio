import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) return null;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        const valid = emailRegex.test(value);
        return valid ? null : { invalidEmail: true };
    };
}
