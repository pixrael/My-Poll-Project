import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { ServerResponseMyPoll } from './server-response.model';

const url = 'http://localhost:8080/tryLogin';


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
    const body = `{      "login":"${login}",      "password":"${password}",   }`;

    this.http.post(url, body).subscribe((response: any) => {
      console.log('response from request ', response);

      if (response.status === 'success') {
        if (response.loggedUser === 'true') {
          this.serverResponseSource.next({
            status: 'success',
            dataResponse: {
              loggedUser: true,
              userData: response.userData
            }
          });

        } else {

          this.serverResponseSource.next({
            status: 'success',
            dataResponse: {
              loggedUser: false,
              userData: null,
              description: response.description

            }
          });

        }



      } else {

        this.serverResponseSource.next({
          status: 'error',
          dataResponse: response.description
        });

      }


    });

    this.serverResponseSource.next({
      status: 'waiting-reponse',
      dataResponse: null
    });


    /*
    // making the request

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

      }, 1500);

    } */
  }

}
