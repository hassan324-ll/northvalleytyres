import { Component } from '@angular/core';
import { LocationDetails } from "../../components/location-details/location-details";

@Component({
  selector: 'app-adas',
  standalone: true,
  imports: [LocationDetails],
  templateUrl: './adas.html',
  styleUrl: './adas.css',
})
export class Adas {

}
