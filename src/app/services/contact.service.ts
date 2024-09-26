import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../models/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://65c0cfa6dc74300bce8cc64d.mockapi.io/Contact/profile';

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.baseUrl);
  }

  getContactById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createContact(data: any): Observable<any> {
    return this.http.post<IContact[]>(this.baseUrl, data);
  }

  updateContact(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteContact(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
