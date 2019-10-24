import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalSlorageService {

  constructor() {

  }

  public setItem(nameItem: string, item: any) {

    return localStorage.setItem(nameItem, JSON.stringify(item));
  }

  public getItem(nameItem: string) {
    return localStorage.getItem(nameItem);
  }

  public removeItem(nameItem: string) {
    return localStorage.removeItem(nameItem);
  }
}
