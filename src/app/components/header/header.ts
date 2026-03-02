import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  isMobileMenuOpen = false;
  isDesktopNavSticky = false;

  private lastScrollY = 0;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

 @HostListener('window:scroll', [])
  onWindowScroll() {

    // Apply only on desktop
    if (window.innerWidth > 1100) {
      this.isDesktopNavSticky = window.scrollY > 50;
    } else {
      this.isDesktopNavSticky = false;
    }

  }

}
