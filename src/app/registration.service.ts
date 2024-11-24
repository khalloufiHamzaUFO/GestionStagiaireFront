import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  urlList: string
  url: string
  constructor(private httpC: HttpClient) {
    this.urlList = "http://localhost:8089/user/list";
    this.url = "http://localhost:8089/user";
  }
  public getUsers() {
    return this.httpC.get<any[]>(this.urlList).pipe(
      map(users => {
        const newUsers = []
        for (let user of users) {
          const email = user.email;
          newUsers.push({ email: email });
        }
        return newUsers;
      })
      , tap(users => console.log(users))
    );
  }

  public getUserByEmail(email: string) {
    return this.httpC.get<any[]>(this.urlList+'?email='+email)
  }

  public registerUser(user: User): Observable<any> {
    let endPoints = "/registeruser"
    return this.httpC.post<any>(this.url + endPoints, user)
  }

  public LoginUser(user: User): Observable<any> {
    let endPoints = "/login"
    return this.httpC.post<any>(this.url + endPoints, user)
  }



}
