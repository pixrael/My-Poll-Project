import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { ServerResponseMyPoll } from './server-response.model';


@Injectable({
  providedIn: 'root'
})
export class LoginAccessRequestService {
  private waitingServerResponse = false;

  private serverResponseSource = new BehaviorSubject<ServerResponseMyPoll>({
    status: 'idle',
    dataResponse: null
  });
  private serverResponse$ = this.serverResponseSource.asObservable();

  constructor(private http: HttpClient) { }

  getServerResponse$(): Observable<ServerResponseMyPoll> {
    return this.serverResponse$;
  }

  requestLogginAccess(login: string, password: string) {
    // TODO request post

    // making the request
    this.serverResponseSource.next({
      status: 'waiting-reponse',
      dataResponse: null
    });

    if (login === 'admin@gmail.com' && password === '1234') {
      setTimeout(() => {
        // receiving the server data for correct login and password
        this.serverResponseSource.next({
          status: 'success',
          dataResponse: {
            status: 'success',
            data: { successfulLogin: true, userId: '000' }
          }
        });

      }, 3000);

    } else {
      // receiving the server data for correct login and password
      setTimeout(() => {
        // receiving the server data for correct login and password
        this.serverResponseSource.next({
          status: 'success',
          dataResponse: {
            status: 'success',
            data: { successfulLogin: false, userId: null, msg: 'invalid login or password' }
          }
        });

      }, 0);

    }
  }

}
