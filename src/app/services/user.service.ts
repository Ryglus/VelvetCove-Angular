import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "./dto/account.dto";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'https://fakestoreapi.com/users/1';

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    return this.http.get<User>(this.API_URL);
  }
}
