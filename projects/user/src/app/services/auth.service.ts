import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginModel } from '../models/account/login.model';
import { API_BASE_URL } from '../core/constants/api.const';
import { Observable } from 'rxjs';
import { TokenModel } from '../view/user/login/login.component';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url!: string;
  storage = inject(StorageService)
  constructor(private http: HttpClient,
    @Inject(API_BASE_URL) protected apiUrl: string) {
    this.url = `${apiUrl}/auth/login`;
  }
  login = (model: ILoginModel): Observable<TokenModel> => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = JSON.stringify(model);

    return this.http.post<TokenModel>(`${this.url}`, body, { headers });
  }
  GetCurrentUser = (): number => {
    let token = this.storage.Get('token');
    if (token) {
      let user = jwtDecode(token) as { id: number }
      console.log('user data: ', user)
      return user.id
    }
    return 0;
  }
}
