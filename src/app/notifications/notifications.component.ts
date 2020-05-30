import { Component, OnInit } from '@angular/core';
import { LoginStatusValidatorService } from 'app/services/login-status-validator.service';
declare var $: any;

import { LoginAccessRequestService } from '../services/login-access-request.service';
import { ServerResponseMyPoll } from '../services/server-response.model';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(loginStatusValidatorService: LoginStatusValidatorService, private loginAccessRequestService: LoginAccessRequestService) { }
  showNotification(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: 'notifications',
      message: 'Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.'

    }, {
      type: type[color],
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
  ngOnInit() {
  }

  onAccessButtonClick(event, login: string, password: string) {
    this.loginAccessRequestService.requestLogginAccess(login, password).subscribe((serverResponse: ServerResponseMyPoll) => {

      if (serverResponse.status === 'waiting-reponse') {
        console.log('should show a loading icon');
      } else if (serverResponse.status === 'success') {
        // check if is correct the login and password
        if (serverResponse.response.successfulLogin) {
          // correct should go to the dashboard with the user id
        } else {
          // should show the message of wrong login or password
        }

      }


    });
  }

}
