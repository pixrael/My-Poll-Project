import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
declare var $: any;

import { LoginAccessRequestService } from '../services/login-access-request.service';
import { ServerResponseMyPoll } from '../services/server-response.model';
import { LoginStatusValidatorService } from 'app/services/login-status-validator.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  @ViewChild('loginInput') loginInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;
  private currentNotify = null;
  private subscription = null;
  showLoading = false;
  regexpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  emailTitle = '';
  passwordTitle = '';
  private errorEmailTitle = 'This is not a valid email';
  private errorPasswordTitle = 'This is not a valid password';

  isEmailValid = false;
  isEmailDirty = false;

  isPasswordValid = false;
  isPasswordDirty = false;

  isFormValid = false;

  constructor(private loginAccessRequestService: LoginAccessRequestService,
    private loginStatusValidatorService: LoginStatusValidatorService) { }

  showNotification(from, align, message: string, type: string) {
    if (this.currentNotify) {
      this.currentNotify.close();
      this.currentNotify = null;
    }

    this.currentNotify = $.notify({
      icon: 'notifications',
      message
    }, {
      type,
      timer: 4000,
      showProgressbar: false,
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

    this.loginAccessRequestService.getServerResponse$().subscribe((serverResponse: ServerResponseMyPoll) => {

      if (serverResponse.status === 'waiting-reponse') {
        this.showLoading = true;
      } else if (serverResponse.status === 'success') {
        this.showLoading = false;
        // check if is correct the login and password
        if (serverResponse.dataResponse.data.successfulLogin) {
          // correct should go to the dashboard with the user id
          this.loginStatusValidatorService.setLoggingStatus(true);
          this.loginStatusValidatorService.validateLoginStatus();

        } else {
          // should show the message of wrong login or password
          this.showNotification('top', 'right', 'Email or password invalid', 'warning');
        }
      }

    });
  }

  onSubmit(event) {

    const email = this.loginInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    this.loginAccessRequestService
      .requestLogginAccess(email, password);

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  validateEmail(email: string) {
    this.isEmailDirty = true;
    this.isEmailValid = this.regexpEmail.test(email);

    if (!this.isEmailValid) {
      this.emailTitle = this.errorEmailTitle;
    } else {
      this.emailTitle = '';
    }

    this.isFormValid = this.isEmailValid && this.isPasswordValid;
  }

  validatePassword(password: string) {
    this.isPasswordDirty = true;
    this.isPasswordValid = password.length > 0;

    if (!this.isPasswordValid) {
      this.passwordTitle = this.errorPasswordTitle;
    } else {
      this.passwordTitle = '';
    }

    this.isFormValid = this.isEmailValid && this.isPasswordValid;
  }

}
