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
      description: 'Browse our selection of premium new tyres for all vehicle types. Fast fitting service available at North Valley Tyres.',
      keywords: 'Tyres near me, Car tyre replacement, Vehicle tyres Lancashire, Emergency tyre fitting, Wheel alignment service, Tyre shop Lancashire',
      url: '/tyres',
      type: 'website'
    });
  }
}
