import { ConfigDialogData } from './../models/confirm-dialog-data';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialog(data: ConfigDialogData): Observable<boolean> {
    return this.dialog.open(ConfirmComponent, {
      data,
      width: '400px',
      disableClose: true
    }).afterClosed();
  }
}
