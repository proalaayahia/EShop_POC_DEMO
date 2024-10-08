import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginModel } from '../models/account/login.model';
import { API_BASE_URL } from '../core/constants/api.const';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from './storage.service';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url!: string;
  private storage = inject(StorageService)
  private isUserLoggedIn!: BehaviorSubject<boolean>;

  constructor(private http: HttpClient,
    @Inject(API_BASE_URL) protected apiUrl: string) {
    this.url = `${apiUrl}/auth/login`;
    this.isUserLoggedIn = new BehaviorSubject<boolean>(false);
  }
  isValidSession = () => {
    const token = this.storage.Get('token');
    if (!token) {
      this.isUserLoggedIn.next(false);
      return false;
    }
    const jwt = jwtDecode(token)
    const date = new Date(jwt.exp! * 1000);
    console.log('date', date)
    console.log('new date', new Date())
    if (new Date() > date) {
      this.isUserLoggedIn.next(false);
      return false;
    }
    this.isUserLoggedIn.next(true);
    return true;
  }
  login = (model: ILoginModel): Observable<TokenModel> => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify(model);

    return this.http.post<TokenModel>(`${this.url}`, body, { headers }).pipe(map((response) => {
      if (response) {
        this.storage.Set('token', response.accessToken)
        this.isUserLoggedIn.next(true);
        return response;
      }
      this.isUserLoggedIn.next(false);
      return response;
    }));
  }

  logout = () => {
    this.storage.Delete('token')
    document.location.reload()
    this.isUserLoggedIn.next(false);
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
  isLoggedIn = (): BehaviorSubject<boolean> => {
    return this.isUserLoggedIn;
  }
}
