import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {
  private isLoggedStatus = false;

  constructor() { }

  isLogged(): boolean {
    return this.isLoggedStatus;
  }

  setLoggingStatus(loggingStatus: boolean) {
    this.isLoggedStatus = loggingStatus;
  }

}
