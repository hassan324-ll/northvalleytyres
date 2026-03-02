import { Component } from '@angular/core';
import { LocationDetails } from '../../components/location-details/location-details';

@Component({
  selector: 'app-mini-car-valet',
  standalone: true,
  imports: [LocationDetails],
  templateUrl: './mini-car-valet.html',
  styleUrl: './mini-car-valet.css',
})
export class MiniCarValet {

}
