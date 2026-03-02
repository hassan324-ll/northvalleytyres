import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs {
  activeTab: string = 'call'; 

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
