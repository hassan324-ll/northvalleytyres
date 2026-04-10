import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from './meta.service';
import { SchemaService } from './schema.service';

/**
 * Service to handle SEO for dynamic routes
 * Automatically updates meta tags based on route parameters
 */
@Injectable({
  providedIn: 'root'
})
export class DynamicRouteService {
  private metaService = inject(MetaService);
  private schemaService = inject(SchemaService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  /**
   * Handle dynamic product/tyre route
   * Usage: In your product page component ngOnInit()
   */
  handleProductRoute(productName: string, description: string, image: string, price?: string): void {
    this.metaService.updateMetaTags({
      title: productName,
      description: description,
      keywords: `${productName}, Cheap tyres Lancashire, Tyre prices Lancashire, Car accessories near me`,
      image: image,
      type: 'product'
    });

    // Add product schema
    this.schemaService.addSchema(
      this.schemaService.getProductSchema(
        productName,
        description,
        image,
        price || 'contact for price',
        productName.replace(/\s+/g, '-'),
        true,
        4.5,
        120
      )
    );

    // Add breadcrumb
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/tyres' },
      { name: productName, url: this.router.url }
    ];
    this.schemaService.addSchema(this.schemaService.getBreadcrumbSchema(breadcrumbs));
  }

  /**
   * Handle dynamic service pages
   */
  handleServiceRoute(serviceName: string, description: string, image: string): void {
    this.metaService.updateMetaTags({
      title: serviceName,
      description: description,
      keywords: `${serviceName}, service, colne`,
      image: image,
      type: 'website'
    });

    this.schemaService.addSchema(
      this.schemaService.getServiceSchema(serviceName, description, image)
    );
  }

  /**
   * Generate SEO-friendly URL from product name
   * "/tyres?brand=michelin" → "/tyres/michelin"
   */
  generateFriendlyUrl(basePath: string, filters: { [key: string]: string }): string {
    let url = basePath;
    
    // Add key filters to URL path instead of query params
    for (const [key, value] of Object.entries(filters)) {
      if (value && key !== 'page') { // Page is often query-based
        url += `/${value}`;
      }
    }
    
    return url;
  }

  /**
   * Parse friendly URL back to filters
   */
  parseFriendlyUrl(path: string): { [key: string]: string } {
    const segments = path.split('/').filter(s => s);
    const filters: { [key: string]: string } = {};
    
    if (segments.length >= 2) {
      filters['category'] = segments[0];
      filters['subcategory'] = segments[1];
    }
    
    return filters;
  }

  /**
   * Best practice: Redirect query params to friendly URLs
   * Example: /tyres?size=195 → /tyres/195-55-15
   */
  redirectToFriendlyUrl(currentUrl: string, filters: { [key: string]: string }): void {
    // Check if URL contains query params
    if (currentUrl.includes('?')) {
      const friendlyUrl = this.generateFriendlyUrl(
        currentUrl.split('?')[0],
        filters
      );
      
      this.router.navigateByUrl(friendlyUrl, { replaceUrl: true });
    }
  }
}
