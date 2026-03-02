import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

type CarouselFeature = {
  id: string;
  title: string;
  subtitle: string;
  bio: string;
  bgImage: string;
};

@Component({
  selector: 'app-feature-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-carousel.html',
  styleUrls: ['./feature-carousel.css'],
})
export class FeatureCarousel implements OnInit, OnDestroy {
  activeIndex = 0;
  trackIndex = 0;
  transitionEnabled = true;
  progressValues: number[] = [];
  progressTimer: ReturnType<typeof setInterval> | null = null;

  features: CarouselFeature[] = [
    {
      id: '1',
      title: "Drive with Confidence",
      subtitle: 'Expert Tyre Fitting & Wheel Alignment Services',
      bio: 'Premium tyres fitted by experts for maximum safety and performance.',
      bgImage: './sliderimg1.avif',
    },
    {
      id: '2',
      title: 'Clean Inside. Shine Outside.',
      subtitle: 'Complete Interior & Exterior Car Valeting',
      bio: 'Complete car valeting for a spotless finish.',
      bgImage: './sliderimg2.avif',
    },
    {
      id: '3',
      title: 'Bring Back the Gloss',
      subtitle: 'Professional Car Polishing & Paint Protection',
      bio: 'Professional polishing that protects and enhances your vehicle.',
      bgImage: '/./sliderimg3.avif',
    },
  ];
  displaySlides: CarouselFeature[] = [];

  getSlideBackground(imagePath: string): string {
    return `linear-gradient(rgba(7, 12, 18, 0.62), rgba(7, 12, 18, 0.62)), url('${imagePath}')`;
  }

  ngOnInit(): void {
    this.displaySlides = [...this.features, this.features[0]];
    this.progressValues = this.features.map(() => 0);
    this.startProgress();
  }

  ngOnDestroy(): void {
    this.clearProgressTimer();
  }

  nextSlide(): void {
    this.trackIndex += 1;
    this.activeIndex = (this.activeIndex + 1) % this.features.length;
    this.progressValues = this.features.map(() => 0);
    this.startProgress();
  }

  onTrackTransitionEnd(): void {
    if (this.trackIndex === this.features.length) {
      this.transitionEnabled = false;
      this.trackIndex = 0;
      this.activeIndex = 0;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.transitionEnabled = true;
        });
      });
    }
  }

  getTrackTransform(): string {
    return `translateX(-${this.trackIndex * 100}%)`;
  }

  private startProgress(): void {
    this.clearProgressTimer();

    const duration = 3000;
    const interval = 30;
    const step = 100 / (duration / interval);

    this.progressTimer = setInterval(() => {
      if (this.progressValues[this.activeIndex] < 100) {
        this.progressValues[this.activeIndex] += step;
      }

      if (this.progressValues[this.activeIndex] >= 100) {
        this.progressValues[this.activeIndex] = 100;
        this.nextSlide();
      }
    }, interval);
  }

  private clearProgressTimer(): void {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }
}
