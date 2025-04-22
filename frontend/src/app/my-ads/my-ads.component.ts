import { Component, OnInit, inject } from '@angular/core';
import {CommonModule, NgIf, NgFor} from "@angular/common";
import { Property, Listing } from '../models';
import { RouterLink } from '@angular/router';
import { PropertyService } from '../services/property.service';
import { FormService } from '../services/form.service';
import { ListingService } from '../listing.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-my-ads',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterLink, FormsModule],
  templateUrl: './my-ads.component.html',
  styleUrl: './my-ads.component.css'
})
export class MyAdsComponent implements OnInit {
  ads: Property[] = [];
  listing: Listing[] = [];
  isLoaded: boolean = false;

  update: boolean = false;
  newPrice: number = 0;
  newDescription: string = '';
  selectedListingId: number = -1;
  
  constructor(
    private propertyService: PropertyService,
    private formService: FormService,
    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.propertyService.getListing().subscribe((myListing: Listing[]) => {
      this.isLoaded = false;
      this.listing = myListing;
      this.listing = this.listing.filter(l => l.user == this.formService.userID);
      console.log(myListing);
      this.isLoaded = true;

      for (let l of this.listing) {
        this.ads.push(l.property);
      }
    });

  }


  onUpdate(id: number, listing: Listing): void {
    listing.property.price = this.newPrice;
    listing.property.description = this.newDescription;
    this.listingService.updateListing(id, listing).subscribe((updatedListing: Property)=>{
      const index = this.listing.findIndex(listing => listing.id === id);
      if (index !== -1) {
        this.listing[index].property.price = updatedListing.price;
        this.listing[index].property.description = updatedListing.description;
      }
    })
        this.update = !this.update;
  }

  onDelete(listingId: number): void {
    this.listingService.deleteListing(listingId).subscribe((message: any) => {
      console.log(message)
    })
    this.listing = this.listing.filter((listing) => listing.id !== listingId);
  }

  
}