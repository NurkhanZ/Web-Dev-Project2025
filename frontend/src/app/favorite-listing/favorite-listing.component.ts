import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Favorites, Listing, Property } from '../models';
import { ListingService } from '../listing.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-favorite-listing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './favorite-listing.component.html',
  styleUrl: './favorite-listing.component.css'
})
export class FavoriteListingComponent  implements OnInit{
  listings!: Listing[];
  favorites!: Favorites[];
  loaded: boolean = false;
  selectedListingId: number = -1;
  private helper = new JwtHelperService();

  constructor(private route: ActivatedRoute,
    private listingService: ListingService,

  ){

  }

  ngOnInit(): void {
    const access = localStorage.getItem("access") ?? '';
    const accessToken = this.helper.decodeToken(access);
    const userId = accessToken.user_id;
    console.log("UserId:", userId);
    this.loaded = false;
    
    this.listingService.getFavorites(userId).subscribe((favorites: Favorites[]) => {
      this.favorites = favorites;
      console.log(favorites)
      
      const favoriteListingIds = this.favorites.map(favorite => favorite.listing_id);

      this.listingService.getListings().subscribe((listings: Listing[]) => {

        this.listings = listings.filter(listing => favoriteListingIds.includes(listing.id));
        this.loaded = true;
      });
    });
  }

  onDelete(listingId: number): void {
    this.listingService.deleteListing(listingId).subscribe((message: any) => {
      console.log(message)
    })
    this.listings = this.listings.filter((listing) => listing.id !== listingId);
  }

  

}
