import { Component, Input, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { Districts, DistrictInterface } from './districts';
import { SubCategories } from '../new-ad/ad-sub-categories';
import { AppComponent } from '../app.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

import { ImageUploaderService, BackendURL } from '../services/image-uploader.service';
import { FormService } from '../services/form.service';
import { ListingService } from '../listing.service';
import { Listing, Images } from '../models';
// import (time) 

@Component({
  selector: 'app-sell-flat-form',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, AppComponent, ReactiveFormsModule],
  templateUrl: './sell-flat-form.component.html',
  styleUrl: './sell-flat-form.component.css'
})
export class SellFlatFormComponent {
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
    type: new FormControl('apartment'),
    price: new FormControl(0),
    area: new FormControl(0),
    rooms_count: new FormControl(0),
    city: new FormControl('Almaty'),
    street_subdist: new FormControl(''),
    number: new FormControl(''),
    description: new FormControl(''),
    
    districts: new FormControl(''),
    subdistricts: new FormControl(''),
    
    building_type: new FormControl(''),
    flat_floor: new FormControl(''),
    flat_floor_total: new FormControl(''),
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
      'Almaty',
      address,
      this.applyForm.value.description ?? '',
    )
    property.images = [
       "https://www.bankrate.com/2023/06/12125257/buying-a-house-worth-it.jpg?auto=webp&optimize=high"
    ]

    property.parameters = this.compileParameters(
      this.applyForm.value.building_type ?? '',
      this.applyForm.value.flat_floor ?? '',
      this.applyForm.value.flat_floor_total ?? '',
      this.applyForm.value.area_k ?? ''
    );

    const listing: Listing = {
      id: 0,
      user: this.userID,
      property: property,
      type: 'sale',
      listing_date: '2024-04-25'
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
    building_type: string,
    flat_floor: string,
    flat_floor_total: string,
    area_k: string
  ) {
    return {
      building_type: building_type,
      flat_floor: flat_floor,
      flat_floor_total: flat_floor_total,
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
      this.imageUploaderService.uploadImage(element).subscribe((p: string) => {
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
