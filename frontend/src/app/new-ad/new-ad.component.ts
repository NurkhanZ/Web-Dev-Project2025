import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { Sell, Rent, SubCategories } from './ad-sub-categories';
import { SellFlatFormComponent } from '../sell-flat-form/sell-flat-form.component';
import { SellHouseFormComponent } from "../sell-house-form/sell-house-form.component";
import { RentFlatFormComponent } from '../rent-flat-form/rent-flat-form.component';
import { RentHouseFormComponent } from '../rent-house-form/rent-house-form.component';

import { FormService } from '../services/form.service';
@Component({
    selector: 'app-new-ad',
    standalone: true,
    templateUrl: './new-ad.component.html',
    styleUrl: './new-ad.component.css',
    imports: [NgIf, NgFor, CommonModule, SellFlatFormComponent, SellHouseFormComponent, RentFlatFormComponent, RentHouseFormComponent]
})
export class NewAdComponent {
  formService: FormService = inject(FormService);
  userID: number = this.formService.userID;
  
  currentCategory: string = "";
  currentSubcategory!: SubCategories;
  categorySelected: boolean = false;
  selectedToLoad!: string;

  target!: SubCategories[] 

  SelectCategory(category: string) {
    if (category == "sell") {
      this.currentCategory = "sell";
      this.target = Sell;
    }
    else if (category == "rent") {
      this.currentCategory = "rent";
      this.target = Rent;
    }
  }

  loadFields(subcategory: SubCategories){ 
    this.categorySelected = true;
    this.currentSubcategory = subcategory;
    this.selectedToLoad = this.currentCategory + "." + subcategory.item;
  }

}
