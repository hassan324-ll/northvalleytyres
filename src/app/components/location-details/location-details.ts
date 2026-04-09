import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-details.html',
  styleUrls: ['./location-details.css'],
})
export class LocationDetails {
  directionError = '';

  private readonly destination = 'North Valley Road, Colne, Lancashire, BB8 9AG';

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  openDirections(origin: string): void {
    const trimmedOrigin = origin.trim();

    if (!trimmedOrigin) {
      this.directionError = 'Please enter your location first.';
      return;
    }

    this.directionError = '';

    const url =
      `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(trimmedOrigin)}` +
      `&destination=${encodeURIComponent(this.destination)}`;

    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

}
