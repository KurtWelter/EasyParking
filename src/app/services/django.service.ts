import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DjangoService {
  apiURL = 'https://cxltlxxp-8000.brs.devtunnels.ms/api';
  constructor(private http: HttpClient) {}

  postUser(data: any): Observable<any>{
    return this.http.post(this.apiURL+'/registro',data);
  }

  autenticarUser(data: any): Observable<any>{
    return this.http.post(this.apiURL+'/login',data);
  }
}
