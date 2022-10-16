
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerHandlerService {
  isLoading = new Subject<boolean>();

  constructor(private spinner: NgxSpinnerService) {
  }

  show() {
    this.spinner.show();
    this.isLoading.next(true);
  }

  hide() {
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}
