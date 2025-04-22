import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Property} from "../models";
import { ListingService } from '../listing.service';
import { UserService } from '../user.service';
import { Listing } from '../models';
import { JwtHelperService } from '@auth0/angular-jwt';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
  flatSale !: Listing;
  related_offers !:Listing[];
  userId: number = 0;
  userName: string = "";
  userContact: string = "";
  loaded: boolean = false;
  private helper = new JwtHelperService();

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    private userService: UserService) {

  }

  ngOnInit() {
    const access = localStorage.getItem("access") ?? '';
    const accessToken = this.helper.decodeToken(access);
    this.userId = accessToken.user_id;
    this.route.paramMap.subscribe((params: any) => {
      if(params.get('id')) {
        const listingId = Number(params.get('id'));
        this.loaded = false;
        this.listingService.getListing(listingId).subscribe((listing: any) => {
          this.flatSale = listing;

          this.userService.getUser(listing.user).subscribe((user: any) => {
            this.userName = user.username,
            this.userContact = user.contact_info
          }
          )
          this.loaded = true;
        })
      }
    })
    this.listingService.getListings().subscribe((listing: any) => {
      this.related_offers = listing.slice(0, 4);
    })
  }

  addFavorite() {
    console.log(this.userId);
    this.listingService.addFavorites(this.userId, this.flatSale.id).subscribe((listing: any) => {
      console.log(listing);
    } )
  }

}