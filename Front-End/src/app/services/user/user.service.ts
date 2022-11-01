import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: any = 'http://localhost:8080/api/';
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();
  userSubject: any = new BehaviorSubject<any>(null);
  user: any = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login(Username: string, Password: string): any {
    return this.http.post(`${this.url}auth/signin`, { Username, Password }, httpOptions)
    //.toPromise().then((res: any) => {
    //   if (res && res.accessToken) {
    //     sessionStorage.setItem('accessToken', res.accessToken);
    //     if(res.accountNumber){
    //     sessionStorage.setItem('accountNumber', res.accountNumber);
    //     }
    //     this.errorSubject.next(null);
    //     if (res) {
    //       this.userSubject.next(res.data);
    //       sessionStorage.setItem('userId', res.id);
    //     }
    //     this.router.navigateByUrl('/dashboard');
    //   } else if (res.Message) {
    //     this.errorSubject.next(res.Message);
    //   }
    // });
  }

  register(Username: string, Email: string, Password: string) {
    return this.http.post(`${this.url}auth/signup`, { Username, Email, Password }, httpOptions)
    //.toPromise().then((res: any) => {
    //   if (res) {
    //     this.errorSubject.next(null);
    //     if (res) {
    //       this.userSubject.next(res.data);
    //     }
    //     this.router.navigateByUrl('/login');
    //   } else if (res.Message) {
    //     this.errorSubject.next(res.Message);
    //   }
    // });
  }

  getUser() {
    const userId = sessionStorage.getItem('userId');
    const jwtToken = sessionStorage.getItem('accessToken');
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      })
    };

    return this.http.get(`${this.url}user/${userId}`, reqHeader);
  }

  getUserByUsername(username) {
    return this.http.get(`${this.url}username/${username}`);
  }

  getTransaction() {
    const accountNumber = sessionStorage.getItem('accountNumber');
    const userId = sessionStorage.getItem('userId');
    const jwtToken = sessionStorage.getItem('accessToken');
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      })
    };

    return this.http.get(`${this.url}user/getTransaction/${accountNumber}`, reqHeader);
  }

  getAllTransaction() {
    const accountNumber = sessionStorage.getItem('accountNumber');
    const userId = sessionStorage.getItem('userId');
    const jwtToken = sessionStorage.getItem('accessToken');
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      })
    };

    return this.http.get(`${this.url}user/getAllTransaction`, reqHeader);
  }

  getAccount() {
    const accountNumber = sessionStorage.getItem('accountNumber');
    const userId = sessionStorage.getItem('userId');
    const jwtToken = sessionStorage.getItem('accessToken');
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      })
    };
    return this.http.get(`${this.url}user/getAccount/${accountNumber}`, reqHeader);
  }

  getAllAccount() {
    // const accountNumber = sessionStorage.getItem('accountNumber');
    // const userId = sessionStorage.getItem('userId');
     const jwtToken = sessionStorage.getItem('accessToken');
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      })
    };
    return this.http.get(`${this.url}user/getAllAccount`, reqHeader);
  }

  checkAccount(accountNumber) {
    //const accountNumber = sessionStorage.getItem('accountNumber');
    const userId = sessionStorage.getItem('userId');
    const jwtToken = sessionStorage.getItem('accessToken');
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      })
    };
    if(accountNumber){
      return this.http.get(`${this.url}user/getAccount/${accountNumber}`, reqHeader);
      }
    }

  trasnferAmount(formData) {
    const userId = sessionStorage.getItem('userId');
    const jwtToken = sessionStorage.getItem('accessToken');
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      })
    };

    return this.http.post(`${this.url}user/transferAmount/${userId}`, formData, reqHeader);
  }

  createAccount(formData) {
    const userId = sessionStorage.getItem('userId');
    const jwtToken = sessionStorage.getItem('accessToken');
    const reqHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: jwtToken,
      })
    };

    return this.http.post(`${this.url}user/createAccount/${userId}`,formData, reqHeader);
  }
}
