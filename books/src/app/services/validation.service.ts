
import { FormControl } from '@angular/forms';

export function ValidationService(control: FormControl) {
    let patern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    if (patern.test(control.value)) {
        return { validPassword: false };
    }
    return { validPassword: true };

}
