import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-primary-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './primary-navbar.component.html',
  styleUrl: './primary-navbar.component.css'
})
export class PrimaryNavbarComponent {

}
