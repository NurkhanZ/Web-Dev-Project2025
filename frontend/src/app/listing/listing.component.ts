import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { Listing, Property } from '../models';
import { ListingService } from '../listing.service';
import { SearchService } from '../search.service';
// import { LISTINGS, PROPERTIES } from '../fake-db';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchComponent,
    FormsModule
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {
  listings!: Listing[];
  loaded: boolean = false;
  listingType: string | null = '';
  propertyType: string | null = '';
  criteria: any;
  update: boolean = false;
  newPrice: number = 0;
  newDescription: string = '';
  selectedListingId: number = -1;

  constructor(private route: ActivatedRoute,
    private listingService: ListingService,
    private searchService: SearchService
 
  ){

  }

  ngOnInit(): void {
    this.loaded = false;
    
    this.listingService.getListings().subscribe((listings: Listing[]) => {
      this.listings = listings;
      // console.log(this.listings);
      this.loaded = true;
    })

    this.route.paramMap.subscribe((params) => {
      this.listingType = String(params.get("listingType"))|| null;
      this.propertyType = String(params.get("propertyType"))|| null;
      // console.log(this.propertyType);
     })

     this.searchService.currentSearchCriteria.subscribe(criteria => {
      this.criteria = criteria;
      // console.log(this.minValue, this.maxValue);
     })
  }

  onUpdate(id: number, listing: Listing): void {
    listing.property.price = this.newPrice;
    listing.property.description = this.newDescription;
    this.listingService.updateListing(id, listing).subscribe((updatedListing: Property)=>{
      const index = this.listings.findIndex(listing => listing.id === id);
      if (index !== -1) {
        this.listings[index].property.price = updatedListing.price;
        this.listings[index].property.description = updatedListing.description;
      }
    })
        this.update = !this.update;
  }

  onDelete(listingId: number): void {
    this.listingService.deleteListing(listingId).subscribe((message: any) => {
      console.log(message)
    })
    this.listings = this.listings.filter((listing) => listing.id !== listingId);
  }

}
