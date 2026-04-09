import { Component } from '@angular/core';
import { LocationDetails } from "../../components/location-details/location-details";

@Component({
  selector: 'app-mobile-fitting',
  standalone: true,
  imports: [LocationDetails],
  templateUrl: './mobile-fitting.html',
  styleUrls: ["./mobile-fitting.css"],
})
export class MobileFitting {

}
