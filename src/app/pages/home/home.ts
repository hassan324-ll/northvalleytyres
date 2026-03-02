import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocationDetails } from "../../components/location-details/location-details";
import { FeatureCarousel } from "../../components/feature-carousel/feature-carousel";

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, LocationDetails, FeatureCarousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnDestroy {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  private readonly businessStartYear = 1998;
  readonly yearsOfExperience = Math.max(new Date().getFullYear() - this.businessStartYear, 0);

  selectedImageIndex: number | null = null;

  images = [
    { src: '/homegallery1.jpg', title: 'Best Service' },
    { src: '/homegallery2.jpg', title: 'Wheel Repair' },
    { src: '/homegallery3.jpg', title: 'Car Polishing' },
    { src: '/homegallery4.jpg', title: 'Engine Check' },
    { src: '/homegallery5.jpg', title: 'Oil Service' },
    { src: '/homegallery6.jpg', title: 'Computer Diagnosis' },
    { src: '/homegallery7.jpg', title: 'Battery Replacement' },
    { src: '/homegallery8.jpg', title: 'Tool Service' },
        { src: '/homegallery9.jpg', title: 'Tool Service' },
            { src: '/homegallery10.jpg', title: 'Tool Service' },
                { src: '/homegallery11.jpg', title: 'Tool Service' },
                    { src: '/homegallery2.jpg', title: 'Wheel Alignment' },



  ];

  get selectedImage(): string | null {
    if (this.selectedImageIndex === null) {
      return null;
    }
    return this.images[this.selectedImageIndex]?.src ?? null;
  }

  openImage(index: number) {
    this.selectedImageIndex = index;
    this.document.body.classList.add('lightbox-open');
  }

  closeImage() {
    this.selectedImageIndex = null;
    this.document.body.classList.remove('lightbox-open');
  }

  prevImage() {
    if (this.selectedImageIndex === null) {
      return;
    }
    this.selectedImageIndex =
      (this.selectedImageIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    if (this.selectedImageIndex === null) {
      return;
    }
    this.selectedImageIndex = (this.selectedImageIndex + 1) % this.images.length;
  }

  ngOnDestroy() {
    this.document.body.classList.remove('lightbox-open');
  }
}

