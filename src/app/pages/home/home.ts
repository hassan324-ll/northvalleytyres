import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import { LocationDetails } from "../../components/location-details/location-details";
import { FeatureCarousel } from "../../components/feature-carousel/feature-carousel";
import { Tyre, TyreLookupApiResponse } from '../../services/tyre';
import { finalize } from 'rxjs/operators';

interface VehicleLookupResult {
  registration: string;
  make: string;
  model: string;
  colour: string;
  frontTyres: string[];
  rearTyres: string[];
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, FormsModule, LocationDetails, FeatureCarousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnDestroy {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly tyreService: Tyre,
    private readonly router: Router
  ) {}

  private readonly businessStartYear = 1998;
  readonly yearsOfExperience = Math.max(new Date().getFullYear() - this.businessStartYear, 0);
  isSubmitting = false;
  submitMessage = '';
  submitStatus: 'success' | 'error' = 'success';
  serviceOptions: string[] = [
    'Tyres',
    'Wheel Alignment & Balancing',
    'Mini Valeting',
    'Full Valeting',
    'Mobile Tyre Fitting',
    'ADAS Radar Calibration'
  ];
  locationOptions: string[] = ['Location 1', 'Location 2', 'Location 3'];
  formData = {
    user_name: '',
    service_type: '',
    address: '',
    location: '',
    city: '',
    warranty: '',
    description: ''
  };

  selectedImageIndex: number | null = null;
  registrationNumber = '';
  tyreLookupLoading = false;
  tyreLookupError = '';
  lookupResult: VehicleLookupResult | null = null;

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
    this.document.body.classList.remove('tyre-popup-open');
  }

  sendEmail() {
    const hasEmptyField = Object.values(this.formData).some(
      (value) => !value || !value.trim()
    );

    if (hasEmptyField) {
      this.submitStatus = 'error';
      this.submitMessage = 'Please fill all fields';
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    emailjs.send(
      'service_xwb556l',
      'template_bzp7xzl',
      this.formData,
      'bOcUDi3-jiZ0Nb52F'
    ).then(
      () => {
        this.submitStatus = 'success';
        this.submitMessage = 'Form submitted successfully';
        this.isSubmitting = false;
      },
      (error) => {
        console.log(error);
        this.submitStatus = 'error';
        this.submitMessage = 'Failed to send request. Please try again.';
        this.isSubmitting = false;
      }
    );
  }

  searchByRegistration() {
    const registration = this.registrationNumber.trim().toUpperCase();
    if (!registration) {
      this.tyreLookupError = 'Please enter a registration number.';
      this.lookupResult = null;
      return;
    }

    this.tyreLookupLoading = true;
    this.tyreLookupError = '';
    this.lookupResult = null;
    this.document.body.classList.remove('tyre-popup-open');

    this.tyreService
      .searchByRegistration(registration)
      .pipe(finalize(() => (this.tyreLookupLoading = false)))
      .subscribe({
        next: (response) => {
          const mapped = this.mapLookupResponse(response, registration);
          if (!mapped) {
            this.tyreLookupError = 'No tyre data found for this registration.';
            return;
          }

          this.lookupResult = mapped;
          this.document.body.classList.add('tyre-popup-open');
        },
        error: () => {
          this.tyreLookupError = 'Unable to fetch vehicle data right now. Please try again.';
          this.document.body.classList.remove('tyre-popup-open');
        },
      });
  }

  closeLookupPopup() {
    this.lookupResult = null;
    this.document.body.classList.remove('tyre-popup-open');
  }

  bookTyre(tyreSize: string) {
    this.router.navigate(['/tyres'], {
      queryParams: {
        reg: this.lookupResult?.registration ?? this.registrationNumber.trim().toUpperCase(),
        tyre: tyreSize,
      },
    });
  }

  private mapLookupResponse(
    response: TyreLookupApiResponse,
    registration: string
  ): VehicleLookupResult | null {
    const dataItems = response?.Response?.DataItems;
    const records = dataItems?.TyreDetails?.RecordList ?? [];

    if (!dataItems?.VehicleDetails || !records.length) {
      return null;
    }

    const frontTyres = records
      .map((record) => this.formatTyre(record?.Front?.Tyre?.Size, record?.Front?.Tyre?.SpeedIndex))
      .filter((value): value is string => Boolean(value));

    const rearTyres = records
      .map((record) => this.formatTyre(record?.Rear?.Tyre?.Size, record?.Rear?.Tyre?.SpeedIndex))
      .filter((value): value is string => Boolean(value));

    return {
      registration,
      make: dataItems.VehicleDetails.Make ?? '-',
      model: dataItems.VehicleDetails.Model ?? '-',
      colour: 'WHITE',
      frontTyres: this.unique(frontTyres),
      rearTyres: this.unique(rearTyres),
    };
  }

  private formatTyre(size?: string, speedIndex?: string): string | null {
    if (!size) {
      return null;
    }

    const speed = speedIndex?.trim();
    return speed ? `${size} ${speed}` : size;
  }

  private unique(values: string[]): string[] {
    return [...new Set(values)];
  }
}

