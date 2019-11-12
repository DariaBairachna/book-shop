import { Injectable } from '@angular/core';
import { Observable, fromEvent, observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
@Injectable()
export class FileHelper {

    public uploadImage(event: any) {
        if (event.target.files.length > 0) {
            const fileReader = new FileReader();
            let imageToUpload = event.target.files.item(0);
            let file: File = event.target.files[0];
            this.saveImg(file);
            return this.imageToBase64(fileReader, imageToUpload);
        };

    }

    public saveImg(file: File) {
        const formData = new FormData();
        formData.append('cover', file, file.name);
        return formData;
    }

    public imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
        fileReader.readAsDataURL(fileToRead);
        return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
    }
}