import { Component, OnInit } from '@angular/core';
import { LocationDetails } from "../../components/location-details/location-details";
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-tyres',
  standalone: true,
  imports: [LocationDetails],
  templateUrl: './tyres.html',
  styleUrls: ["./tyres.css"],
})
export class Tyres implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.updateMetaTags({
      title: 'New Tyres',
      description: 'Browse our selection of premium new tyres for all vehicle types. Fast fitting service available at Colne Tyre Centre.',
      keywords: 'tyres, new tyres, tyre fitting, vehicle tyres, car tyres',
      url: '/tyres',
      type: 'website'
    });
  }
}
