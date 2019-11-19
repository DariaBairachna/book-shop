import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        if (!value) return null;
        if (!args) return value;
        value = value.toString().toLowerCase();
        args = args.toLowerCase();
        if(value.includes(args)){
            return value;
        }
        return null;
     

    }
}