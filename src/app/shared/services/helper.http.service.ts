import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResponse } from '../interfaces/json-response';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HelperHttpService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = 'https://localhost:7053/api/';

  get<T>(url: string, config?: { headers: HttpHeaders }) {
    return this.http.get<JsonResponse<T>>(`${this.baseUrl}${url}`, config);
  }

  post<T>(url: string, data: any) {
    return this.http.post<JsonResponse<T>>(`${this.baseUrl}${url}`, data);
  }

  put<T>(url: string, data: any) {
    return this.http.put<JsonResponse<T>>(`${this.baseUrl}${url}`, data);
  }

  delete<T>(url: string) {
    return this.http.delete<JsonResponse<T>>(`${this.baseUrl}${url}`);
  }
}
