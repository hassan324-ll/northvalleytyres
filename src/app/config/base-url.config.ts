import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

/**
 * Dynamic base URL configuration
 * Automatically detects environment (localhost, production, etc.)
 * and provides the correct base URL for all SEO services
 */
@Injectable({
  providedIn: 'root'
})
export class BaseUrlConfig {
  private _baseUrl: string;

  constructor(@Inject(DOCUMENT) private doc: Document) {
    // Get base URL from current window location
    // In development: http://localhost:4000
    // In production: https://northvalleytyres.com
    this._baseUrl = this.doc?.location?.origin || 'http://localhost:4200';
  }

  /**
   * Get the base URL for the current environment
   */
  getBaseUrl(): string {
    return this._baseUrl;
  }

  /**
   * Check if running in development (localhost)
   */
  isDevelopment(): boolean {
    return this._baseUrl.includes('localhost') || this._baseUrl.includes('127.0.0.1');
  }

  /**
   * Get full URL for a path
   */
  getFullUrl(path: string): string {
    if (!path) return this._baseUrl;
    const normalizedPath = path.startsWith('/') ? path : '/' + path;
    return this._baseUrl + normalizedPath;
  }
}
