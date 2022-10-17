import { SpinnerHandlerService } from '../services/spinner-handler.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'spinner-overlay',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isLoading: Subject<boolean> = this.spinnerHandler.isLoading;
  constructor(public spinnerHandler: SpinnerHandlerService) { }

  ngOnInit(): void { }

}