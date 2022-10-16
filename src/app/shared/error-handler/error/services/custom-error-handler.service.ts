import { ErrorHandler, Injectable, NgZone, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()

export class CustomErrorHandler implements ErrorHandler {

  constructor(private snackbar: MatSnackBar, private zone: NgZone) { }

  handleError(error: unknown) {
    // this.zone.run(() => {
    //   this.snackbar.open(
    //     'Error was detected. Please submit the feedback.',
    //     'Close',
    //     {
    //       duration: 8000
    //     }
    //   );
    // })
  }

}
