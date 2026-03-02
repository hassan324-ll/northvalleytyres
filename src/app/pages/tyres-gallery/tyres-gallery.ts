import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocationDetails } from '../../components/location-details/location-details';

@Component({
  selector: 'app-tyres-gallery',
  imports: [CommonModule, LocationDetails],
  templateUrl: './tyres-gallery.html',
  styleUrl: './tyres-gallery.css',
})
export class TyresGallery {
images: string[] = [
    './homegallery1.jpg',
    './homegallery2.jpg',
    './homegallery3.jpg',
    './homegallery4.jpg',
    './homegallery5.jpg',
    './homegallery6.jpg',
    './homegallery7.jpg',
    './homegallery8.jpg',
    './homegallery9.jpg',
    './homegallery10.jpg',
    './homegallery11.jpg',
    './homegallery4.jpg',
  ];

  isOpen = false;
  currentIndex = 0;

  openModal(index: number) {
    this.currentIndex = index;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  nextImage() {
    this.currentIndex =
      (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) %
      this.images.length;
  }
}
