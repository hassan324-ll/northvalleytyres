import { Component } from '@angular/core';
import { LocationDetails } from "../../components/location-details/location-details";

@Component({
  selector: 'app-valeting',
  standalone: true,
  imports: [LocationDetails],
  templateUrl: './valeting.html',
  styleUrl: './valeting.css',
})
export class Valeting {

}
