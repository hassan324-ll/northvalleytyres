import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import { LocationDetails } from "../../components/location-details/location-details";
import { FeatureCarousel } from "../../components/feature-carousel/feature-carousel";
import { Tyre, TyreLookupApiResponse, TyreSizeSearchParams } from '../../services/tyre';
import { finalize } from 'rxjs/operators';

interface VehicleLookupResult {
  registration: string;
  make: string;
  model: string;
  colour: string;
  frontTyres: string[];
  rearTyres: string[];
}

interface TyreSizeFilter {
  width: string;
  profile: string;
  rim: string;
  speed: string;
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
  tyreSizeLookupLoading = false;
  tyreSizeLookupError = '';
  tyreSizeFilter: TyreSizeFilter = {
    width: '205',
    profile: '55',
    rim: '16',
    speed: 'Any',
  };
  readonly tyreWidthOptions = ['195', '205', '215', '225', '235', '245', '255'];
  readonly tyreProfileOptions = ['45', '50', '55', '60', '65'];
  readonly tyreRimOptions = ['15', '16', '17', '18', '19', '20'];
  readonly tyreSpeedOptions = ['Any', 'H', 'V', 'W', 'Y', 'T', 'S', 'R'];

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
    this.tyreSizeLookupError = '';

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

  searchByTyreSize() {
    const { width, profile, rim, speed } = this.tyreSizeFilter;
    if (!width || !profile || !rim) {
      this.tyreSizeLookupError = 'Please select width, profile, and rim size.';
      return;
    }

    const params: TyreSizeSearchParams = {
      width,
      profile,
      rim,
    };

    if (speed && speed !== 'Any') {
      params.speedRating = speed;
    }

    this.tyreSizeLookupLoading = true;
    this.tyreSizeLookupError = '';
    this.tyreLookupError = '';
    this.lookupResult = null;
    this.document.body.classList.remove('tyre-popup-open');

    this.tyreService
      .searchByTyreSize(params)
      .pipe(finalize(() => (this.tyreSizeLookupLoading = false)))
      .subscribe({
        next: (response) => {
          const sizeLabel = this.buildTyreSizeLabel(this.tyreSizeFilter);
          const mapped = this.mapLookupResponse(response, sizeLabel, {
            make: 'Custom size search',
            model: sizeLabel,
            colour: 'N/A',
          });

          if (!mapped) {
            this.tyreSizeLookupError = 'No tyre data found for that size.';
            return;
          }

          this.lookupResult = mapped;
          this.document.body.classList.add('tyre-popup-open');
        },
        error: () => {
          this.tyreSizeLookupError = 'Unable to fetch tyre data right now. Please try again.';
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

  private buildTyreSizeLabel(filter: TyreSizeFilter): string {
    const base = `${filter.width}/${filter.profile}R${filter.rim}`;
    return filter.speed && filter.speed !== 'Any' ? `${base} ${filter.speed}` : base;
  }

  private mapLookupResponse(
    response: TyreLookupApiResponse,
    registration: string,
    fallbackVehicle?: Partial<Pick<VehicleLookupResult, 'make' | 'model' | 'colour'>>
  ): VehicleLookupResult | null {
    const dataItems = response?.Response?.DataItems;
    const records = dataItems?.TyreDetails?.RecordList ?? [];

    if (!records.length) {
      return null;
    }

    const frontTyres = records
      .map((record) => this.formatTyre(record?.Front?.Tyre?.Size, record?.Front?.Tyre?.SpeedIndex))
      .filter((value): value is string => Boolean(value));

    const rearTyres = records
      .map((record) => this.formatTyre(record?.Rear?.Tyre?.Size, record?.Rear?.Tyre?.SpeedIndex))
      .filter((value): value is string => Boolean(value));

    const vehicleDetails = dataItems?.VehicleDetails;
    const make = vehicleDetails?.Make ?? fallbackVehicle?.make ?? '-';
    const model = vehicleDetails?.Model ?? fallbackVehicle?.model ?? '-';
    const colour = fallbackVehicle?.colour ?? 'WHITE';

    return {
      registration,
      make,
      model,
      colour,
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

