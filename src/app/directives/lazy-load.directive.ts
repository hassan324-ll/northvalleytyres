import { Directive, ElementRef, Input, OnInit, Renderer2, OnDestroy } from '@angular/core';

/**
 * Lazy loading directive for images
 * Usage: <img appLazyLoad src="path/to/image.avif" alt="description" />
 * 
 * Features:
 * - Native lazy loading with fallback
 * - Intersection Observer for better control
 * - Blur-up effect for UX improvement
 * - Proper loading state management
 */
@Directive({
  selector: 'img[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit, OnDestroy {
  @Input() appLazyLoad = true;
  
  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (!this.appLazyLoad) return;

    // Set loading attribute for native lazy loading
    this.renderer.setAttribute(this.el.nativeElement, 'loading', 'lazy');

    // Add blur-up effect with placeholder
    this.renderer.addClass(this.el.nativeElement, 'lazy-image');

    // Use Intersection Observer for better control and fallback
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      // Fallback: load immediately for older browsers
      this.loadImage();
    }
  }

  private setupIntersectionObserver(): void {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '50px', // Start loading 50px before image enters viewport
      threshold: 0.01
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage();
          this.observer?.unobserve(this.el.nativeElement);
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private loadImage(): void {
    const img = this.el.nativeElement;
    
    // If already loaded, return
    if (img.src) return;

    // Get the data-src attribute
    const src = img.getAttribute('data-src');
    if (src) {
      // Add loading class for animations
      this.renderer.addClass(img, 'loading');

      // Create a new image to preload
      const tempImg = new Image();
      tempImg.onload = () => {
        img.src = src;
        this.renderer.removeClass(img, 'loading');
        this.renderer.addClass(img, 'loaded');
      };
      tempImg.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        this.renderer.removeClass(img, 'loading');
        this.renderer.addClass(img, 'error');
      };
      tempImg.src = src;
    } else if (img.src) {
      // Native src already set, just mark as loaded
      this.renderer.addClass(img, 'loaded');
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
