import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorites, Listing, Property } from './models';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private BASE_URL = "http://127.0.0.1:8000";

  constructor(private client: HttpClient) { }

  createListing(listing: Listing): Observable<Listing> {
    return this.client.post<Listing>(`${this.BASE_URL}/tweets/listing/`, listing);
  }

  getListings(): Observable<Listing[]> {
    return this.client.get<Listing[]>(`${this.BASE_URL}/tweets/listing/`);
  }

  getListing(id: number): Observable<Listing> {
    return this.client.get<Listing>(`${this.BASE_URL}/tweets/listing/${id}/`);
  }

  updateListing(id: number, listing: Listing): Observable<Property> {
    return this.client.put<Property>(`${this.BASE_URL}/tweets/listing/${id}/`, listing);
  }

  deleteListing(id: number): Observable<any> {
    return this.client.delete<any>(`${this.BASE_URL}/tweets/listing/${id}/`);
  }

  getFavorites(userId: number): Observable<Favorites[]> {
    return this.client.get<Favorites[]>(`${this.BASE_URL}/tweets/favorites/${userId}/`)
  }

  addFavorites(userId: number, listingId: number): Observable<Favorites> {
    return this.client.post<Favorites>(`${this.BASE_URL}/tweets/favorites/`, {"user_id": userId, "listing_id": listingId})
  }

  deleteFavorites(id: number): Observable<any> {
    return this.client.delete<any>(`${this.BASE_URL}/tweets/favorites/${id}/`);
  }
}
