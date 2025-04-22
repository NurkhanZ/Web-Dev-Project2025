import { Component, Input, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AppComponent } from '../app.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

import { SubCategories } from '../new-ad/ad-sub-categories';
import { DistrictInterface, Districts } from '../sell-flat-form/districts';

import { ImageUploaderService, BackendURL } from '../services/image-uploader.service';
import { FormService } from '../services/form.service';
import { Listing } from '../models';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-rent-house-form',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, AppComponent, ReactiveFormsModule],
  templateUrl: './rent-house-form.component.html',
  styleUrl: './rent-house-form.component.css'
})
export class RentHouseFormComponent {
  @Input() userID!: number ;
  @Input() currentCategory: string = "";
  @Input() selectedSubcategory!: SubCategories;

  SubmitURL: string = BackendURL;

  district: string = '';
  subdistrict!: string;
  districts: DistrictInterface[] = Districts;
  subdistricts: string[] = [];


  formService: FormService = inject(FormService);
  constructor(private listingService: ListingService) { }

  applyForm = new FormGroup({
    type: new FormControl('house'),
    price: new FormControl(0),
    area: new FormControl(0),
    rooms_count: new FormControl(0),
    city: new FormControl('Almaty'),
    street_subdist: new FormControl(''),
    number: new FormControl(''),
    description: new FormControl(''),

    districts: new FormControl(''),
    subdistricts: new FormControl(''),
    
    rent_duration: new FormControl(''),
    build_year: new FormControl(''),
    land_area: new FormControl(''),
    area_l: new FormControl(''),  
    area_k: new FormControl(''),  
  });
 


  submitForm() {
    const address = this.formService.compileAddress(
      this.applyForm.value.street_subdist ?? '',
      this.district?? '',
      this.subdistrict?? '',
      this.applyForm.value.number?? ''
    );

      
    const property = this.formService.mainToJson(
      1,
      this.applyForm.value.type ?? '',
      this.applyForm.value.price ?? 0,
      this.applyForm.value.area ?? 0,
      this.applyForm.value.rooms_count ?? 0,
      this.applyForm.value.city ?? '',
      address,
      this.applyForm.value.description ?? '',
    );


    property.images = [
      "https://www.bankrate.com/2023/06/12125257/buying-a-house-worth-it.jpg?auto=webp&optimize=high"
   ]

    property.parameters = this.compileParameters(
      this.applyForm.value.rent_duration ?? '',
      this.applyForm.value.build_year ?? '',
      this.applyForm.value.land_area ?? '',
      this.applyForm.value.area_l ?? '',
      this.applyForm.value.area_k ?? ''
    );

    const listing: Listing = {
      id: 0,
      user: this.userID,
      property: property,
      type: 'rent',
      listing_date: "2024-04-25"
    };

    console.log('listing: ', listing);
    this.formService.submitListing(listing);


    this.listingService.createListing(listing).subscribe(
      (listing: Listing) => {
        console.log(listing);
      });


    window.location.href = "my";
  }


  compileParameters(
    rent_duration: string,
    build_year: string,
    land_area: string,
    area_l: string,
    area_k: string
  ) {
    return {
      rent_duration: rent_duration,
      building_type: build_year,
      land_area: land_area,
      area_l: area_l,
      area_k: area_k
    }
  }


  loadSubDists(district: DistrictInterface) {
    this.subdistricts = district.subdistricts;
  }


  resetCategory() {
    location.reload();
  }


  // Image upload

  
  imageUploaderService = inject(ImageUploaderService);
  imagesUrl: Array<string> = [];
  uploading = false;

  selectedImages!: FileList;
  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      this.selectedImages = inputElement.files;
    }
  }

  upload(): void {
    if (this.selectedImages) {
      this.uploadFiles(this.selectedImages);
    }
  }


  private uploadFiles(images: FileList) {
    this.uploading = true;
    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      this.imageUploaderService.uploadImage(element).subscribe((p) => {
        this.imagesUrl.push(p);
        this.uploading = false;
      });
    }
  }


  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event?.dataTransfer?.files) {
      this.uploadFiles(event.dataTransfer.files);
    }
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
}
