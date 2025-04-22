import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  // this.formService.submitForm(
  //   this.applyForm.value.type ?? '',
  //   this.applyForm.value.price ?? '',
  //   this.applyForm.value.area ?? '',
  //   this.applyForm.value.rooms_count ?? '',
  //   this.applyForm.value.city ?? '',
  //   this.applyForm.value.address ?? '',
  //   this.applyForm.value.description ?? '',
  //   this.applyForm.value.parameters?.building_type ?? '',
  //   this.applyForm.value.parameters?.flat_floor ?? '',
  //   this.applyForm.value.parameters?.flat_floor_total ?? '',
  //   this.applyForm.value.parameters?.area_k ?? '',
  // );
  private helper = new JwtHelperService();
  access = localStorage.getItem("access") ?? '';
  accessToken = this.helper.decodeToken(this.access);
  userID = this.accessToken.user_id;

  compileAddress(
    street_subdist: string,
    district: string,
    subdistrict: string,
    number: string
  ): string {
    return district + " " + subdistrict + " " + number;
  }

  mainToJson(
    id: number,
    type: string,
    price: number,
    area: number,
    rooms_count: number,
    city: string,
    address: string,
    description: string,
  ): any {
      return {
        id: id,
        type: type,
        price: price,
        area: area,
        rooms_count: rooms_count,
        city: city,
        address: address,
        description: description,
      } 
    
  }


  submitListing(listing: any) {
    const listingJson = JSON.stringify(listing);
    alert(listingJson);
    console.log('listing: ', listingJson);

  }

}
