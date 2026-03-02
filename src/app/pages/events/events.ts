import { Component } from '@angular/core';
import { LocationDetails } from "../../components/location-details/location-details";

@Component({
  selector: 'app-events',
  imports: [LocationDetails],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {

}
