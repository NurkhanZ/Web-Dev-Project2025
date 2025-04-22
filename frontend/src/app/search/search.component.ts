import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  selectedAction: string = 'Купить';
  selectedType: string = 'Квартиру';
  minValue: number = 0;
  maxValue: number = 0;
  hasPhoto: boolean = false;
  values: { [key: string]: string } = {
    'Купить': 'sale',
    'Арендовать': 'rent',
    'Дом': 'house',
    'Квартиру': 'apartment'
  }

  constructor(private route: Router,
    private criteria: SearchService
  ) {

  }

  onSearch() {
    const searchCriteria = {
      minValue: this.minValue,
      maxValue: this.maxValue,
      hasPhoto: this.hasPhoto
    };
    
    this.criteria.changeSearchCriteria(searchCriteria);
    console.log(this.values[this.selectedAction], this.values[this.selectedType])
    this.route.navigate(['/', this.values[this.selectedAction], this.values[this.selectedType]]);
  }

}
