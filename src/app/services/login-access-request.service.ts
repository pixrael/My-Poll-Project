import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { ServerResponse } from './server-response.model';


@Injectable({
  providedIn: 'root'
})
export class LoginAccessRequestService {
  private waitingServerResponse = false;

  private serverResponseSource = new BehaviorSubject<ServerResponse>({
    status: 'idle',
    response: null
  });
  private serverResponse$ = this.serverResponseSource.asObservable();

  constructor(private http: HttpClient) { }

  requestLogginAccess(login: string, password: string): Observable<ServerResponse> {
    // TODO request post

    // making the request
    this.serverResponseSource.next({
      status: 'waiting-reponse',
      response: null
    });

    if (login === 'admin@gmail.com' && password === '1234') {
      setTimeout(() => {
        // receiving the server data for correct login and password
        this.serverResponseSource.next({
          status: 'waiting-reponse',
          response: {
            status: 'success',
            response: { successfulLogin: true, userId: '000' }
          }
        });

      }, 3000);

    } else {
      // receiving the server data for correct login and password
      setTimeout(() => {
        // receiving the server data for correct login and password
        this.serverResponseSource.next({
          status: 'waiting-reponse',
          response: {
            status: 'success',
            response: { successfulLogin: false, userId: null, msg: 'invalid login or password' }
          }
        });

      }, 3000);

    }

    return this.serverResponse$;

  }

}
