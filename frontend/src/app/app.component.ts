import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimaryNavbarComponent } from './primary-navbar/primary-navbar.component';
import { SecondaryNavbarComponent } from './secondary-navbar/secondary-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SellFlatFormComponent } from './sell-flat-form/sell-flat-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrimaryNavbarComponent, SecondaryNavbarComponent, FooterComponent, SellFlatFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shanyraq';
}
