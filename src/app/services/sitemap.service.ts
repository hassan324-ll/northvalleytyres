import { Injectable, inject } from '@angular/core';
import { BaseUrlConfig } from '../config/base-url.config';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SitemapService {
  private baseUrlConfig = inject(BaseUrlConfig);
  private baseUrl: string;

  constructor() {
    this.baseUrl = this.baseUrlConfig.getBaseUrl();
  }

  /**
   * Define all static routes and their SEO properties
   */
  getStaticUrls(): SitemapUrl[] {
    const today = new Date().toISOString().split('T')[0];
    
    return [
      // Main pages - high priority and frequently updated
      {
        loc: '',
        lastmod: today,
        changefreq: 'daily',
        priority: 1.0
      },
      {
        loc: 'tyres',
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: 'new-tyre',
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: 'about-us',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: 'contact-us',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.8
      },
      
      // Services - moderately important
      {
        loc: 'wheel-alignment-balancing',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: 'adas',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: 'valeting',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: 'mini-car-valet',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: 'full-car-valet',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: 'mobile-fitting',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: 'price-match',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.7
      },
      
      // Gallery and events - lower priority
      {
        loc: 'events',
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.6
      },
      {
        loc: 'tyres-gallery',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.5
      },
      {
        loc: 'valeting-gallery',
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.5
      }
    ];
  }

  /**
   * Generate XML sitemap content
   */
  generateSitemap(urls: SitemapUrl[]): string {
    const urlEntries = urls
      .map(url => {
        const fullUrl = url.loc ? `${this.baseUrl}/${url.loc}` : this.baseUrl;
        return `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${urlEntries}
</urlset>`;
  }

  /**
   * Generate sitemap with image information (for SEO-friendly product pages)
   */
  generateImageSitemap(urls: Array<SitemapUrl & { images?: Array<{ loc: string; caption?: string }> }>): string {
    const urlEntries = urls
      .map(url => {
        const fullUrl = url.loc ? `${this.baseUrl}/${url.loc}` : this.baseUrl;
        const imageEntries = url.images
          ?.map(img => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      ${img.caption ? `<image:caption>${escapeXml(img.caption)}</image:caption>` : ''}
    </image:image>`)
          .join('\n') || '';

        return `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
${imageEntries}
  </url>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;
  }

  /**
   * Generate sitemap index (for multiple sitemaps)
   * Use when you have more than 50,000 URLs
   */
  generateSitemapIndex(sitemapUrls: string[]): string {
    const sitemapEntries = sitemapUrls
      .map(url => `  <sitemap>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`)
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
  }
}

/**
 * Helper function to escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
