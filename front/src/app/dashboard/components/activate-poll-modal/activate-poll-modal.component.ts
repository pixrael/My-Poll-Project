import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activate-poll-modal',
  templateUrl: './activate-poll-modal.component.html',
  styleUrls: ['./activate-poll-modal.component.css']
})
export class ActivatePollModalComponent implements OnInit {

  startDate: Date = null;
  endDate: Date = null;

  errorMsgs = {
    start: 'Please select a date after today.\n',
    end: 'Please select a date after the start date.\n'
  };


  validationData = {
    start: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    },
    end: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    }
  };

  constructor() { }

  ngOnInit(): void { }


  onDateChange(dateType: string, value: string) {
    this.validationData[dateType].isDirty = true;
    const isValid = this.checkIfFieldIsValid(dateType, value);
    this.validationData[dateType].isValid = isValid;

    if (!isValid) {
      this.validationData[dateType].titleMsg = this.errorMsgs[dateType];
    } else {
      this.validationData[dateType].titleMsg = '';
    }

  }



  private checkIfFieldIsValid(dateType: string, value: string): boolean {
    const dateValue = new Date(value);

    if (dateType === 'start') {
      this.startDate = dateValue;
      const currentDate = new Date();
      return this.checkIfDateIsValid(currentDate, dateValue);
    } else if (dateType === 'end') {
      this.endDate = dateValue;
      if (this.startDate) {
        return this.checkIfDateIsValid(this.startDate, dateValue);
      } else {
        return true;
      }
    }
  }

  private checkIfDateIsValid(prevDate: Date, nextDate: Date): boolean {
    return prevDate < nextDate;
  }

}
