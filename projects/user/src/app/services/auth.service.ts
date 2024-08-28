import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ILoginModel} from '../models/account/login.model';
import { API_BASE_URL } from '../core/constants/api.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url!: string;

  constructor(private http: HttpClient,
    @Inject(API_BASE_URL) protected apiUrl: string) {
    this.url = `${apiUrl}/auth/login`;
  }
  login = (model:ILoginModel) => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = JSON.stringify(model);

    return this.http.post(`${this.url}`, body, { headers });
  }
}
