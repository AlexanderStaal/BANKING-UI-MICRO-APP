import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService extends AppConfig {

  constructor(private httpClient: HttpClient) {
    super();
  }

  load() {
    return this.httpClient.get<AppConfig>('app.config.json')
      .toPromise()
      .then(data => {
        this.baseUrl = data.baseUrl;
        this.imgExcel = data.imgExcel;
        this.imgCSV = data.imgCSV;
      })
      .catch((error) => {
        throw error;
      });
  }
}

