import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchCriteria = new BehaviorSubject<any>( {
    minValue: 0,
    maxValue: Infinity,
    hasPhoto: false
  })

  currentSearchCriteria = this.searchCriteria.asObservable();

  constructor() { }

  changeSearchCriteria(newSearchCriteria: any) {
    this.searchCriteria.next(newSearchCriteria);
  }

}
