import { Injectable, inject, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { BaseUrlConfig } from '../config/base-url.config';

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private baseUrlConfig = inject(BaseUrlConfig);
  private platformId = inject(PLATFORM_ID);
  private baseUrl: string;
  private currentCanonicalUrl: string;
  private isBrowser: boolean;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {
    this.baseUrl = this.baseUrlConfig.getBaseUrl();
    this.currentCanonicalUrl = this.baseUrl;
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Update canonical URL on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = this.normalizeUrl(event.urlAfterRedirects);
      this.updateCanonicalUrl(url);
    });
  }

  /**
   * Normalize URLs for consistency
   * - Remove trailing slashes (except for root)
   * - Use lowercase
   * - Remove query parameters
   */
  private normalizeUrl(url: string): string {
    // Remove query params
    let normalized = url.split('?')[0];
    
    // Remove fragments
    normalized = normalized.split('#')[0];
    
    // Remove trailing slash (except root)
    if (normalized !== '/' && normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    
    // Ensure lowercase
    normalized = normalized.toLowerCase();
    
    return normalized;
  }

  updateMetaTags(metadata: PageMetadata): void {
    // Set page title
    const fullTitle = `${metadata.title} | North Valley Tyres`;
    this.titleService.setTitle(fullTitle);

    // Set standard meta tags
    this.setMetaTag('description', metadata.description);
    
    if (metadata.keywords) {
      this.setMetaTag('keywords', metadata.keywords);
    }

    // Set canonical URL (normalized)
    const normalizedUrl = metadata.url ? this.normalizeUrl(metadata.url) : '';
    const canonicalUrl = this.constructCanonicalUrl(normalizedUrl);
    this.setCanonicalUrl(canonicalUrl);
    this.currentCanonicalUrl = canonicalUrl;

    // Set Open Graph tags with canonical URL
    this.setMetaTag('og:title', metadata.title);
    this.setMetaTag('og:description', metadata.description);
    this.setMetaTag('og:type', metadata.type || 'website');
    this.setMetaTag('og:url', canonicalUrl);
    
    if (metadata.image) {
      this.setMetaTag('og:image', `${this.baseUrl}${metadata.image}`);
      this.setMetaTag('og:image:width', '1200');
      this.setMetaTag('og:image:height', '630');
    }

    // Set Twitter Card tags
    this.setMetaTag('twitter:card', 'summary_large_image');
    this.setMetaTag('twitter:title', metadata.title);
    this.setMetaTag('twitter:description', metadata.description);
    
    if (metadata.image) {
      this.setMetaTag('twitter:image', `${this.baseUrl}${metadata.image}`);
    }

    // Additional useful meta tags
    this.setMetaTag('robots', 'index, follow');
    this.setMetaTag('viewport', 'width=device-width, initial-scale=1');
    this.setMetaTag('theme-color', '#000000');
  }

  /**
   * Construct canonical URL
   */
  private constructCanonicalUrl(path: string): string {
    if (!path || path === '/') {
      return this.baseUrl;
    }
    
    // Ensure path starts with /
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    
    return this.baseUrl + path;
  }

  /**
   * Update canonical URL for current page (called on route changes)
   */
  private updateCanonicalUrl(url: string): void {
    const canonicalUrl = this.constructCanonicalUrl(url);
    this.setCanonicalUrl(canonicalUrl);
    this.currentCanonicalUrl = canonicalUrl;
  }

  /**
   * Get current canonical URL
   */
  getCurrentCanonicalUrl(): string {
    return this.currentCanonicalUrl;
  }

  private setMetaTag(name: string, content: string): void {
    const selectorType = name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name';
    const selectorValue = `${selectorType}="${name}"`;
    const existingTag = this.metaService.getTag(selectorValue);

    const meta: MetaDefinition = {
      content,
    };

    if (selectorType === 'property') {
      meta.property = name;
    } else {
      meta.name = name;
    }

    if (existingTag) {
      this.metaService.updateTag(meta, selectorValue);
    } else {
      this.metaService.addTag(meta, false);
    }
  }

  private setCanonicalUrl(url: string): void {
    if (!this.isBrowser) {
      return;
    }

    const doc = document as Document;
    let canonicalLink = doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalLink) {
      canonicalLink.href = url;
    } else {
      canonicalLink = doc.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = url;
      doc.head.appendChild(canonicalLink);
    }
  }

  // Convenience method for common page types
  setHomepageMeta(): void {
    this.updateMetaTags({
      title: 'Premium Tyres & Car Valeting Services',
      description: 'North Valley Tyres offers premium tyres, wheel alignment, ADAS calibration, and professional car valeting services.',
      keywords: 'tyres, wheel alignment, car valeting, ADAS calibration, mobile fitting',
      image: '/sliderimg1.avif',
      url: '/',
      type: 'website'
    });
  }

  setProductPageMeta(productName: string, description: string, image: string, price?: string): void {
    this.updateMetaTags({
      title: productName,
      description: description,
      keywords: `tyres, ${productName.toLowerCase()}, car maintenance`,
      image: image,
      type: 'product'
    });
  }

  setServicePageMeta(serviceName: string, description: string, image: string): void {
    this.updateMetaTags({
      title: serviceName,
      description: description,
      keywords: `${serviceName.toLowerCase()}, car service, colne`,
      image: image,
      type: 'website'
    });
  }

  setArticlePageMeta(title: string, description: string, author?: string): void {
    this.updateMetaTags({
      title: title,
      description: description,
      keywords: 'articles, news, tips',
      type: 'article',
      author: author
    });
  }
}
