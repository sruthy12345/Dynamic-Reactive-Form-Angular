import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jsonFormControls } from './form/form.component';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/forms'; // URL of the mock API

  /* to submit form data */
  submitFormData(formData: jsonFormControls): Observable<jsonFormControls> {
    return this.http.post<jsonFormControls>(this.apiUrl, formData);
  }

}
