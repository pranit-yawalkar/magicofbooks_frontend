import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public setRoles(roles: any) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles() {
    return localStorage.getItem('roles');
  }

  public setToken(token: string) {
    return localStorage.setItem('token', token);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public clear() {
    return localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
