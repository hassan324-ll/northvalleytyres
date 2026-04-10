import { Component, OnInit } from '@angular/core';
import { LocationDetails } from "../../components/location-details/location-details";
import { MetaService } from '../../services/meta.service';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [LocationDetails],
  templateUrl: './about-us.html',
  styleUrls: ["./about-us.css"],
})
export class AboutUs implements OnInit {
  constructor(
    private metaService: MetaService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.metaService.updateMetaTags({
      title: 'About Us - North Valley Tyres',
      description: 'Learn about North Valley Tyres\' history, mission, and commitment to providing premium tyre and car services since 1998.',
      keywords: 'about us, Trusted tyre company Lancashire, North Valley Tyres, North Valley mobile tyre fitting, Certified tyre specialists UK',
      url: '/about-us',
      type: 'website'
    });

    // Add schema data for about page
    this.schemaService.addSchema(this.schemaService.getOrganizationSchema());
    this.schemaService.addSchema(
      this.schemaService.getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'About Us', url: '/about-us' }
      ])
    );
  }
}
