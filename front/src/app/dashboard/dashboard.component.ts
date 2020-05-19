import { Component, OnInit, ElementRef } from '@angular/core';
import * as Chartist from 'chartist';
import { FormControl } from '@angular/forms';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  regexpTitle = /^[a-zA-Z0-9_ ]{1,40}$/;
  regexpArtist = /^[a-zA-Z@][a-zA-Z][a-zA-Z0-9_ ]{1,38}$/;

  isSaveButtonDisable = true;

  artItems = [{
    path: 'assets/img/angular.png', title: 'My Angular logo',
    date: '4/7/2017', author: 'Set',
    uploaded: false
  }, {
    path: 'assets/img/angular.png', title: 'My Angular logo2',
    date: '4/7/2017', author: 'Set2',
    uploaded: false
  }, {
    path: 'assets/img/angular.png', title: 'My Angular logo3',
    date: '4/7/2017', author: 'Set3',
    uploaded: false
  }, {
    path: 'assets/img/angular.png', title: 'My Angular logo4',
    date: '4/7/2017', author: 'Set4',
    uploaded: false
  }];

  errorMsgs = {
    artistError: 'Can start with letters or @.\n Numbers cant be added after @\nNumbers and letters are allowed from second characted ahead.\nWhite spaces are allowed.\nMax 20 of length.\nNo spaces are allowed.',
    titleError: 'Letters and numbers are allowed. Max 20 of length',
    dateError: 'Dates can not be after today. Please select a past date'
  };

  validationData = [{
    artist: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    },
    title: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    },
    date: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    }
  },
  {
    artist: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    },
    title: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    },
    date: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    }
  },
  {
    artist: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    },
    title: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    },
    date: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    }
  },
  {
    artist: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    },
    title: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    },
    date: {
      isDirty: false,
      isValid: true,
      titleMsg: ''
    }
  }];


  constructor(private elementRef: ElementRef) { }

  clickInputToUploadImage(artItemIndex: number) {
    const inputToUploadImageHTML = this.elementRef.nativeElement.querySelector('#inpt' + artItemIndex);

    inputToUploadImageHTML.click();
  }

  processFile(itemIndex: number) {

    const imageInput = this.elementRef.nativeElement.querySelector('#inpt' + itemIndex);

    const file: File = imageInput.files[0];
    const reader = new FileReader();

    const onLoadCallback = (event: any) => {
      const selectedFile = new ImageSnippet(event.target.result, file);
      this.artItems[itemIndex].path = selectedFile.src;
      this.artItems[itemIndex].uploaded = true;

      this.updateSaveButtosState();

      reader.removeEventListener('load', onLoadCallback);
    };

    reader.addEventListener('load', onLoadCallback);

    reader.readAsDataURL(file);
  }

  updateSaveButtosState() {
    this.isSaveButtonDisable = this.artItems.filter(artItem => artItem.uploaded).length < 2;
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }
  ngOnInit() { }

  onBlur(fieldType: string, index: number, value: string) {
    this.validationData[index][fieldType].isDirty = true;
    const isValid = this.checkIfFieldIsValid(fieldType, value);
    this.validationData[index][fieldType].isValid = isValid;

    if (!isValid) {
      this.validationData[index][fieldType].titleMsg = this.getErrorMsg(fieldType);
    } else {
      this.validationData[index][fieldType].titleMsg = '';
    }
  }

  onDateChange(value: string, index: number) {
    this.validationData[index].date.isDirty = true;
    const isValid = this.checkIfFieldIsValid('date', value);
    this.validationData[index].date.isValid = isValid;

    if (!isValid) {
      this.validationData[index].date.titleMsg = this.getErrorMsg('date');
    } else {
      this.validationData[index].date.titleMsg = '';
    }


  }



  private checkIfFieldIsValid(fieldType: string, fieldValue: string): boolean {

    if (fieldType === 'title') {
      return this.checkIfTitleIsValid(fieldValue.trim());
    } else if (fieldType === 'artist') {
      return this.checkIfArtistIsValid(fieldValue.trim());
    } else if (fieldType === 'date') {
      return this.checkIfDateIsValid(fieldValue);
    }
  }

  private checkIfDateIsValid(fieldValue: string) {
    const today = new Date();

    return today > new Date(fieldValue);
  }

  private checkIfTitleIsValid(fieldValue: string): boolean {
    const test = this.regexpTitle.test(fieldValue);
    return test;
  }

  private checkIfArtistIsValid(fieldValue: string): boolean {
    const test = this.regexpArtist.test(fieldValue);
    return test;
  }

  private getErrorMsg(fieldType: string) {
    if (fieldType === 'title') {
      return this.errorMsgs.titleError;
    } else if (fieldType === 'artist') {
      return this.errorMsgs.artistError;
    } else if (fieldType === 'date') {
      return this.errorMsgs.dateError;
    }

  }

}
