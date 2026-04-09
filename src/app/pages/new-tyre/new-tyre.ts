import { Component } from '@angular/core';
import { LocationDetails } from "../../components/location-details/location-details";

@Component({
  selector: 'app-new-tyre',
  standalone: true,
  imports: [LocationDetails, ],
  templateUrl: './new-tyre.html',
  styleUrls: ["./new-tyre.css"],
})
export class NewTyre {

}
