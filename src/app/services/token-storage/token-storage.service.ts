import { Injectable } from '@angular/core';

const TOKEN_KEY = 'JWTToken';
const AUTH_USER = 'AuthUser';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveToken(token: string, authenticatedUser: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(AUTH_USER);

    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(AUTH_USER, authenticatedUser);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getAuthenticatedUser(): string {
    return sessionStorage.getItem(AUTH_USER);
  }

  public signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(AUTH_USER);

    window.sessionStorage.clear();
  }
}
