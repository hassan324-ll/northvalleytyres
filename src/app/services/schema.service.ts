import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { BaseUrlConfig } from '../config/base-url.config';

export interface SchemaConfig {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private baseUrlConfig = inject(BaseUrlConfig);
  private baseUrl: string;

  constructor(@Inject(DOCUMENT) private doc: Document) {
    this.baseUrl = this.baseUrlConfig.getBaseUrl();
  }

  /**
   * Add JSON-LD schema to the document head
   */
  addSchema(schema: SchemaConfig): void {
    if (!this.doc || !this.doc.head) {
      return;
    }

    const scriptElement = this.doc.createElement('script');
    scriptElement.type = 'application/ld+json';
    scriptElement.textContent = JSON.stringify(schema);
    this.doc.head.appendChild(scriptElement);
  }

  /**
   * Organization Schema - Basic business information
   */
  getOrganizationSchema(): SchemaConfig {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'North Valley Tyres',
      'url': this.baseUrl,
      'logo': `${this.baseUrl}/logo.png`,
      'description': 'Premium tyres, wheel alignment, ADAS calibration, and professional car valeting services.',
      'sameAs': [
        'https://www.facebook.com/northvalleytyres',
        'https://www.instagram.com/northvalleytyres',
        'https://www.twitter.com/northvalleytyres'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Customer Service',
        'telephone': '+44-1282-123456', // Update with real number
        'email': 'info@northvalleytyres.com'
      }
    };
  }

  /**
   * LocalBusiness Schema - Location, hours, services
   */
  getLocalBusinessSchema(): SchemaConfig {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': this.baseUrl,
      'name': 'North Valley Tyres',
      'image': `${this.baseUrl}/sliderimg1.avif`,
      'description': 'Premium tyre and car service center in Colne offering tyres, wheel alignment, ADAS calibration, and car valeting.',
      'url': this.baseUrl,
      'telephone': '+44-1282-123456', // Update with real number
      'email': 'info@northvalleytyres.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Your Street Address', // Update with real address
        'addressLocality': 'Colne',
        'addressRegion': 'Lancashire',
        'postalCode': 'BB8 1AA', // Update with real postcode
        'addressCountry': 'GB'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '53.8565', // Update with real coordinates
        'longitude': '-2.0787'
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '08:00',
          'closes': '17:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': 'Saturday',
          'opens': '09:00',
          'closes': '14:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': 'Sunday',
          'opens': '10:00',
          'closes': '13:00'
        }
      ],
      'sameAs': [
        'https://www.facebook.com/colonetyre',
        'https://www.instagram.com/colnetyrecentre',
        'https://www.google.com/maps/place/your-business-id'
      ]
    };
  }

  /**
   * Product Schema - For tyre products
   */
  getProductSchema(
    productName: string,
    description: string,
    image: string,
    price: string,
    sku: string,
    inStock: boolean = true,
    rating: number = 4.5,
    reviewCount: number = 120
  ): SchemaConfig {
    return {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      'name': productName,
      'image': `${this.baseUrl}${image}`,
      'description': description,
      'sku': sku,
      'brand': {
        '@type': 'Brand',
        'name': 'Colne Tyre Centre'
      },
      'offers': {
        '@type': 'Offer',
        'url': `${this.baseUrl}/tyres`,
        'priceCurrency': 'GBP',
        'price': price,
        'availability': inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'seller': {
          '@type': 'Organization',
          'name': 'Colne Tyre Centre'
        }
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': rating.toString(),
        'reviewCount': reviewCount.toString()
      }
    };
  }

  /**
   * BreadcrumbList Schema - Navigation structure
   */
  getBreadcrumbSchema(
    breadcrumbs: Array<{ name: string; url: string }>
  ): SchemaConfig {
    const itemListElement = breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      'item': `${this.baseUrl}${crumb.url}`
    }));

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': itemListElement
    };
  }

  /**
   * Service Schema - For services like tyre fitting, ADAS, etc.
   */
  getServiceSchema(
    serviceName: string,
    description: string,
    image: string,
    areaServed: string[] = ['GB']
  ): SchemaConfig {
    return {
      '@context': 'https://schema.org/',
      '@type': 'Service',
      'name': serviceName,
      'description': description,
      'image': `${this.baseUrl}${image}`,
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Colne Tyre Centre',
        'url': this.baseUrl
      },
      'areaServed': areaServed,
      'availableLanguage': 'en'
    };
  }

  /**
   * FAQPage Schema - For FAQ sections
   */
  getFAQSchema(
    faqs: Array<{ question: string; answer: string }>
  ): SchemaConfig {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };
  }

  /**
   * Article Schema - For blog posts or articles
   */
  getArticleSchema(
    title: string,
    description: string,
    image: string,
    datePublished: string,
    dateModified: string,
    author: string = 'Colne Tyre Centre',
    articleBody: string = ''
  ): SchemaConfig {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': title,
      'description': description,
      'image': `${this.baseUrl}${image}`,
      'datePublished': datePublished,
      'dateModified': dateModified,
      'author': {
        '@type': 'Organization',
        'name': author,
        'url': this.baseUrl
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Colne Tyre Centre',
        'logo': {
          '@type': 'ImageObject',
          'url': `${this.baseUrl}/logo.png`
        }
      },
      'articleBody': articleBody
    };
  }
}
