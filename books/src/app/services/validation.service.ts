
import { FormControl } from '@angular/forms';

export class ValidationService {

    public static validationPassword(control: FormControl) {
        let patern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
        if (patern.test(control.value)) {

            return;
        }
        return { validPassword: false };
    }

    public static comparePassword(control: FormControl) {
        const password = control.value.password;
        const confirmPassword = control.value.confirmPassword;
        if (
            control.value !== undefined && password !== "", confirmPassword !== "" &&   control.value !== null
        ) {
        debugger
            if (password === confirmPassword) {
                return;
            } else {
                return { matchPassword: true };
            }
        }
    }

}
