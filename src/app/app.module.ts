import { LocalStorage } from 'node-localstorage';
import { TransferFundsHistoryComponent } from './banking/transfers/components/transfer-funds-history/transfer-funds-history.component';
import { NgModule, DoBootstrap, Injector, NO_ERRORS_SCHEMA, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GlobalHttpErrorHandling } from './shared/error-handler/error/interceptors/global-error-handling.interceptor'; 
import { SpinnerInterceptorService } from './banking/shared/spinner-loader/services/spinner-interceptor.service';
import { TransferFundsComponent } from './banking/transfers/components/transfer-funds/transfer-funds.component';
import { AccountCreateComponent } from './banking/accounts/components/account-create/account-create.component';
import { AccountDeleteComponent } from './banking/accounts/components/account-delete/account-delete.component';
import { AccountsListComponent } from './banking/accounts/components/accounts-list/accounts-list.component';
import { SpinnerHandlerService } from './banking/shared/spinner-loader/services/spinner-handler.service';
import { AccountEditComponent } from './banking/accounts/components/account-edit/account-edit.component';
import { CustomErrorHandler } from './shared/error-handler/error/services/custom-error-handler.service'; 
import { SpinnerComponent } from './banking/shared/spinner-loader/spinner/spinner.component';
import { ErrorComponent } from './shared/error-handler/error/components/error.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartupComponent } from './authentication/startup/startup.component';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ConfirmComponent } from './shared/dialog/confirm/confirm.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppConfigService } from './app-config/app-config.service';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BankingComponent } from './banking/banking.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { AdminComponent } from './admin/admin.component';
import { createCustomElement } from '@angular/elements';
import { AppRoutingModule } from './app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from "@angular/material/sort";
import { AppConfig } from './app-config/app-config';
import { PortalModule } from '@angular/cdk/portal';
import { AppComponent } from './app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorHandler } from '@angular/core';
import { NglModule } from 'ng-lightning';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './authentication/login/login.component'; 
import { SignupComponent } from './authentication/signup/signup.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { LogoutComponent } from './authentication/logout/logout.component';

export function initilizerFn(appConfigService: AppConfigService) {
  return () => {
    return appConfigService.load();
  }
}
@NgModule({
  declarations: [
    AppComponent,
    BankingComponent,
    AccountCreateComponent,
    AccountDeleteComponent,
    AccountEditComponent,
    AccountsListComponent,
    TransferFundsComponent,
    TransferFundsHistoryComponent,
    SpinnerComponent,
    AdminComponent,
    FeedbackComponent,
    ConfirmComponent,
    StartupComponent,
    ErrorComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    NglModule,
    FontAwesomeModule,
    MatTableExporterModule,
    RxReactiveFormsModule,
    NgxSpinnerModule,
    MatChipsModule,
    MatButtonModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
    PortalModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule

  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgxSpinnerService, SpinnerHandlerService, StorageServiceModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorService,
      multi: true
    },
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: false
    },
    {
      provide: AppConfig,
      deps: [HttpClient],
      useExisting: AppConfigService
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: initilizerFn
    },
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpErrorHandling,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule implements DoBootstrap {
  constructor(private readonly injector: Injector) { }

  ngDoBootstrap(): void {
    const customElement = createCustomElement(AppModule, {
      injector: this.injector
    });

    if (!customElements.get('banking-ma-ui"')) {
      customElements.define('banking-ma-ui"', customElement);
    }
  }
}
