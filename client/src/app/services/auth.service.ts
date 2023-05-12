import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: any
  public user: any

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  login(data: any): Observable<{ message: string, token: string, user: any }> {
    return this.http.post<{ message: string, token: string, user: any }>('/api/auth/login', data)
      .pipe(
        tap(
          ({ token, user }) => {
            this.setToken(token);
            localStorage.setItem('auth-token', token);
            this.setUser(user);
            // this.navigate();
          }
        ))
  };

  accessServer(): Observable<any> {
    return this.http.get<any>('/api/auth')
  }

  navigate() {

    if (this.user && this.user.status === "admin" || this.user && this.user.status === "boss") {
      this.router.navigate(['/admin'])
    }

    if (this.user && this.user.status === "seller") {
      this.router.navigate(['/seller'])
    }

  }

  setToken(token: any) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }


  /*   
  navigate() {

    if (this.user && this.user.status === "admin" || this.user && this.user.status === "boss") {
      this.router.navigate(['/admin'])
    }

    if (this.user && this.user.status === "seller") {
      this.router.navigate(['/seller'])
    }

  } 
  */

  isAuthenticated(): boolean {
    return this.token
  }

  setUser(user: any) {
    this.user = user
  }


  logout() {
    this.setToken(undefined)
    this.setUser(undefined)
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  
 

  getIp(): Observable<any> {
    return this.http.get<any>("http://api.ipify.org/?format=json")
  }

}
