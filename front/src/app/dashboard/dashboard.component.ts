import { Component, OnInit, ElementRef } from '@angular/core';
import * as Chartist from 'chartist';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  regexpTitle = /^@?(\w){1,40}$/g;



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
    artistError: 'only letter are allowed. Max 20 of length',
    titleError: 'only letter are allowed. Max 20 of length',
    data: 'Invalid date'

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
    data: {
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
    data: {
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
    data: {
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
    data: {
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
    const isValid = this.checkIfTitleIsValid(value);
    this.validationData[index][fieldType].isValid = isValid;

    if (!isValid) {
      this.validationData[index][fieldType].titleMsg = this.errorMsgs.titleError;
    } else {
      this.validationData[index][fieldType].titleMsg = '';
    }
  }

  private checkIfTitleIsValid(value: string): boolean {
    const test = this.regexpTitle.test(value);
    return test;
  }

}
