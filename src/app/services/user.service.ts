import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:8080';

  private requestHeader = new HttpHeaders({
    'No-Auth': "True"
  })

  constructor(private http: HttpClient, private auth: AuthService) { }

  public register(registerData: FormData): Observable<Object> {
    return this.http.post(`${this.BASE_URL}/users/register`, registerData, { headers: this.requestHeader });
  }

  public updateProfile(updateData: FormData): Observable<Object> {
    return this.http.put(`${this.BASE_URL}/users/update-profile`, updateData);
  }

  public getUserDetails(): Observable<Profile> {
    return this.http.get<Profile>(`${this.BASE_URL}/users/profile`);
  }

  public login(loginData: any): Observable<Object> {
    return this.http.post(`${this.BASE_URL}/authenticate`, loginData, { headers: this.requestHeader });
  }

  public forUser(): Observable<Object> {
    return this.http.get(`${this.BASE_URL}/users/forUser`, { responseType: 'text' });
  }


  public forAdmin(): Observable<Object> {
    return this.http.get(`${this.BASE_URL}/users/forAdmin`, { responseType: 'text' });
  }

  public roleMatch(role: string): boolean {
    const userRoles: any = this.auth.getRoles();
    if (userRoles) {
      if (!userRoles.includes(role)) {
        return false;
      }
      return true;
    }

    return false;
  }

  public rolesMatch(roles: Array<string>): boolean {
    const userRoles: any = this.auth.getRoles();

    if (userRoles) {
      for (let role of roles) {
        if (!userRoles.includes(role)) {
          return false;
        }
      }
      return true;
    }

    return false;
  }
}
