import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();

  constructor() { }

  public sendData(showMenu: boolean) {
    this.subject.next(showMenu);
  }

  public getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
