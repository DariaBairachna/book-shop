import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

   

    constructor() {

    }
    validatePassword(control: FormControl) {
         let patern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
      
        if(patern.test(control.value)){
            return { validPassword: false };
        }
        
        return { validPassword: true };
        // return patern.test(control.value)
        
    }

}
