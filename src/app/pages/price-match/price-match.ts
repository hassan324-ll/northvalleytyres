import { Component } from '@angular/core';
import { LocationDetails } from '../../components/location-details/location-details';

@Component({
  selector: 'app-price-match',
  standalone: true,
  imports: [LocationDetails],
  templateUrl: './price-match.html',
  styleUrls: ["./price-match.css"],
})
export class PriceMatch {

}
