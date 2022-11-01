import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  url = 'http://localhost:8080/api/';
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | any {
    const userId = sessionStorage.getItem('userId');
    const jwtToken = sessionStorage.getItem('accessToken');
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      })
    };

    if (userId && jwtToken) {
      return this.http.get(`${this.url}user/${userId}`, reqHeader).pipe(
        map(res => {
          if (res['id'] === userId) {
            return true;
          } else {
            console.log(res,2)
            this.router.navigateByUrl('/login');
            return false;
          }
        }),
        catchError((err) => {
          return of(false);
        })
      );
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
