import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-details.html',
  styleUrl: './location-details.css',
})
export class LocationDetails {
  directionError = '';

  private readonly destination = 'North Valley Road, Colne, Lancashire, BB8 9AG';

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

    window.open(url, '_blank', 'noopener,noreferrer');
  }

}

