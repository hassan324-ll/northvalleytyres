import { Component } from '@angular/core';
import { LocationDetails } from '../../components/location-details/location-details';

@Component({
  selector: 'app-full-car-valet',
  standalone: true,
  imports: [LocationDetails],
  templateUrl: './full-car-valet.html',
  styleUrls: ["./full-car-valet.css"],
})
export class FullCarValet {

}
