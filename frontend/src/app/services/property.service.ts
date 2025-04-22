import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Listing } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  BASE_URL = 'http://127.0.0.1:8000/tweets';
  constructor(private client: HttpClient) { }

  getListing(): Observable<Listing[]> {
    return this.client.get<Listing[]>(`${this.BASE_URL}/listing/`);
  }
}
