import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

interface ImageVariant {
  src: string;
  type: string;
  media?: string;
}

/**
 * Responsive Image Component
 * Handles multiple image formats with fallbacks
 * Supports lazy loading and responsive sizing
 * 
 * Usage:
 * <app-responsive-image
 *   [src]="'image.jpg'"
 *   [alt]="'Image description'"
 *   [width]="1200"
 *   [height]="630"
 *   [lazy]="true"
 *   [sizes]="'(max-width: 768px) 100vw, 50vw'"
 * ></app-responsive-image>
 */
@Component({
  selector: 'app-responsive-image',
  standalone: true,
  imports: [CommonModule, LazyLoadDirective],
  template: `
    <picture>
      <!-- AVIF format (best compression) -->
      <source 
        *ngIf="avifSrc"
        [srcset]="avifSrc"
        type="image/avif"
        [sizes]="sizes"
      >
      
      <!-- WebP format (good compression, wider support) -->
      <source 
        *ngIf="webpSrc"
        [srcset]="webpSrc"
        type="image/webp"
        [sizes]="sizes"
      >
      
      <!-- JPEG fallback (maximum compatibility) -->
      <img
        [appLazyLoad]="lazy"
        [src]="jpegSrc || src"
        [alt]="alt"
        [width]="width"
        [height]="height"
        [title]="alt"
        class="responsive-image"
        [style.aspect-ratio]="aspectRatio"
        (error)="onImageError()"
      >
    </picture>
  `,
  styles: [`
    picture {
      display: block;
      width: 100%;
    }

    .responsive-image {
      display: block;
      width: 100%;
      height: auto;
      max-width: 100%;
    }

    :host ::ng-deep .lazy-image {
      opacity: 1;
      transition: opacity 0.3s ease-in;
    }

    :host ::ng-deep .lazy-image.loading {
      opacity: 0.7;
      filter: blur(10px);
    }

    :host ::ng-deep .lazy-image.loaded {
      opacity: 1;
      animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0.7;
      }
      to {
        opacity: 1;
      }
    }

    :host ::ng-deep .lazy-image.error {
      opacity: 0.5;
      background-color: #f0f0f0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveImageComponent implements OnInit {
  @Input() src!: string;
  @Input() alt!: string;
  @Input() width!: number;
  @Input() height!: number;
  @Input() lazy = true;
  @Input() sizes = '100vw';

  avifSrc?: string;
  webpSrc?: string;
  jpegSrc?: string;
  aspectRatio?: string;

  ngOnInit(): void {
    this.setupImageVariants();
    this.calculateAspectRatio();
  }

  /**
   * Generate image variants for different formats
   * Assumes images are in public folder with different extensions
   */
  private setupImageVariants(): void {
    if (!this.src) return;

    // Extract base name and extension
    const basePath = this.src.substring(0, this.src.lastIndexOf('.'));

    // Set image variants (assuming files exist for each format)
    // If you don't have all formats, only set the available ones
    if (this.src.endsWith('.avif')) {
      this.avifSrc = this.src;
      this.webpSrc = `${basePath}.webp`;
      this.jpegSrc = `${basePath}.jpg`;
    } else if (this.src.endsWith('.jpg') || this.src.endsWith('.jpeg')) {
      this.avifSrc = `${basePath}.avif`;
      this.webpSrc = `${basePath}.webp`;
      this.jpegSrc = this.src;
    } else if (this.src.endsWith('.png')) {
      this.avifSrc = `${basePath}.avif`;
      this.webpSrc = `${basePath}.webp`;
      this.jpegSrc = `${basePath}.jpg`;
    }
  }

  /**
   * Calculate aspect ratio to prevent layout shift
   */
  private calculateAspectRatio(): void {
    if (this.width && this.height) {
      this.aspectRatio = (this.height / this.width).toString();
    }
  }

  /**
   * Handle image load errors
   */
  onImageError(): void {
    console.warn(`Image failed to load: ${this.src}`);
  }
}
