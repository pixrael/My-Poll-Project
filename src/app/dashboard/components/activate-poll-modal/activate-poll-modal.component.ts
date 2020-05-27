import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-activate-poll-modal',
  templateUrl: './activate-poll-modal.component.html',
  styleUrls: ['./activate-poll-modal.component.css']
})
export class ActivatePollModalComponent implements OnInit {

  @ViewChild('startDateInput') startDateInput: ElementRef;
  @ViewChild('startTimeInput') startTimeInput: ElementRef;

  @ViewChild('endDateInput') endDateInput: ElementRef;
  @ViewChild('endTimeInput') endTimeInput: ElementRef;

  pollStartDate: {
    date: Date;
    time: string;
    isDirtyTime: boolean;
    isDirtyDate: boolean;
    isValid: boolean;
    title: string
  } = { date: null, time: null, isDirtyDate: false, isDirtyTime: false, isValid: true, title: '' };

  pollEndDate: {
    date: Date;
    time: string;
    isDirtyTime: boolean;
    isDirtyDate: boolean;
    isValid: boolean;
    title: string
  } = { date: null, time: null, isDirtyDate: false, isDirtyTime: false, isValid: true, title: '' };

  isAcceptButtonDisabled = true;
  errorMsgs = {
    start: 'Please select a date after today.\n',
    end: 'Please select a date after the start date.\n'
  };

  private pleaseAddHourMsg = 'Please add hour and minutes';
  private interval = null;

  constructor() { }

  ngOnInit(): void { }

  onTodayButtonClick(event) {
    const today = new Date();
    let minutes = today.getMinutes() + 5;
    let hours = today.getHours();

    if (minutes > 59) {
      minutes = minutes - 60;

      hours = hours + 1;

      if (hours > 23) {
        hours = 0;
      }
    }
    let minStr = minutes + '';
    let hoursStr = hours + '';

    if (hoursStr.length === 1) {
      hoursStr = '0' + hoursStr;
    }

    if (minStr.length === 1) {
      minStr = '0' + minStr;
    }

    today.setMinutes(minutes);

    const date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    this.startDateInput.nativeElement.value = date;
    this.onDateChange('start', date);

    const time = hoursStr + ':' + minStr;
    this.startTimeInput.nativeElement.value = time;

    this.onTimeBlur('start', time);
  }

  onDateChange(dateType: ('start' | 'end'), value: string) {

    this.isAcceptButtonDisabled = true;
    if (dateType === 'start') {
      this.pollStartDate.isDirtyDate = true;
      this.pollStartDate.date = new Date(value);

    } else {
      this.pollEndDate.isDirtyDate = true;
      this.pollEndDate.date = new Date(value);
    }

    this.validateDatesAndTimes();
  }

  onTimeBlur(time: ('start' | 'end'), value: string) {
    this.isAcceptButtonDisabled = true;
    if (time === 'start') {
      this.pollStartDate.isDirtyTime = true;
      if (!value.trim()) {
        this.pollStartDate.isValid = false;
        this.pollStartDate.title = this.pleaseAddHourMsg;

      } else {
        this.pollStartDate.time = value;
        this.validateDatesAndTimes();
      }
    } else {
      this.pollEndDate.isDirtyTime = true;
      if (!value.trim()) {
        this.pollEndDate.isValid = false;
        this.pollEndDate.title = this.pleaseAddHourMsg;

      } else {
        this.pollEndDate.time = value;
        this.validateDatesAndTimes();
      }
    }

  }

  onCancelClick(event) {
    this.clearPollsData();
    this.clearPollsInputs();
    this.isAcceptButtonDisabled = true;
    clearInterval(this.interval);
    this.interval = null;
  }

  private clearPollsData() {
    this.pollStartDate = { date: null, time: null, isDirtyDate: false, isDirtyTime: false, isValid: true, title: '' };

    this.pollEndDate = { date: null, time: null, isDirtyDate: false, isDirtyTime: false, isValid: true, title: '' };
  }

  private clearPollsInputs() {
    this.startDateInput.nativeElement.value = '';
    this.startTimeInput.nativeElement.value = '';

    this.endDateInput.nativeElement.value = '';
    this.endTimeInput.nativeElement.value = '';
  }


  private validateDatesAndTimes() {

    let startDateIsValid = true;
    if (this.pollStartDate.isDirtyDate && this.pollStartDate.isDirtyTime) {

      if (!this.checkValidStartDate()) {
        this.pollStartDate.title = 'Start date should be after today';
        this.pollStartDate.isValid = false;
        startDateIsValid = false;
        this.isAcceptButtonDisabled = true;

        clearInterval(this.interval);
        this.interval = null;
      } else {
        this.pollStartDate.title = '';
        this.pollStartDate.isValid = true;
        startDateIsValid = true;
        this.verifyEverySec();
      }

    }

    if (startDateIsValid && this.pollStartDate.isDirtyDate && this.pollStartDate.isDirtyTime &&
      this.pollEndDate.isDirtyDate && this.pollEndDate.isDirtyTime) {



      if (this.checkValidRange()) {
        this.pollStartDate.title = '';
        this.pollStartDate.isValid = true;
        this.pollEndDate.title = '';
        this.pollEndDate.isValid = true;

        this.isAcceptButtonDisabled = false;

      } else {
        this.pollStartDate.title = 'Start date should be before end date';
        this.pollStartDate.isValid = false;
        this.pollEndDate.title = 'End date should be after end start';
        this.pollEndDate.isValid = false;
      }

    }

  }

  private checkValidStartDate(): boolean {
    const startDate = this.pollStartDate.date;
    const startHour = +this.pollStartDate.time.split(':')[0];
    const startMin = +this.pollStartDate.time.split(':')[1];
    startDate.setHours(startHour, startMin);

    return new Date() < startDate;
  }

  private checkValidRange(): boolean {

    const startDate = this.pollStartDate.date;
    const startHour = +this.pollStartDate.time.split(':')[0];
    const startMin = +this.pollStartDate.time.split(':')[1];
    startDate.setHours(startHour, startMin);


    const endDate = this.pollEndDate.date;
    const endHour = +this.pollEndDate.time.split(':')[0];
    const endMin = +this.pollEndDate.time.split(':')[1];
    endDate.setHours(endHour, endMin);

    return startDate < endDate;
  }


  private verifyEverySec() {

    if (!this.interval) {
      this.interval = setInterval(() => {
        this.validateDatesAndTimes();
      }, 1000);
    }

  }

}
