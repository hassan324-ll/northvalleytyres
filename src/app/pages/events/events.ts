import { Component } from '@angular/core';
import { LocationDetails } from "../../components/location-details/location-details";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [LocationDetails],
  templateUrl: './events.html',
  styleUrls: ["./events.css"],
})
export class Events {

}
