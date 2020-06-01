import { Injectable } from '@angular/core';
import { LoginStatusService } from './login-status.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusValidatorService {

  constructor(private loginStatusService: LoginStatusService, private route: ActivatedRoute,
    private router: Router) { }

  validateLoginStatus() {
    if (!this.loginStatusService.isLogged()) {
      this.router.navigate(['/notifications']);
    } else {
      console.log('going to dashboard');
      this.router.navigate(['/dashboard']);
    }
  }

  isLogged(): boolean {
    return this.loginStatusService.isLogged();
  }

  setLoggingStatus(status: boolean) {
    this.loginStatusService.setLoggingStatus(status);
  }

}
