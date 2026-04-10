import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.html',
  styleUrls: ["./contact-us.css"],
})
export class ContactUs implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.updateMetaTags({
      title: 'Contact Us',
      description: 'Get in touch with North Valley Tyres for tyres, wheel alignment, ADAS calibration, and car valeting services. Visit us or call today.',
      keywords: 'contact, Tyre fitting phone number Lancashire, location, Contact tyre services Lancashire, Car service location Lancashire',
      url: '/contact-us',
      type: 'website'
    });
  }

  activeTab: string = 'call'; 
  isSubmitting = false;
  submitMessage = '';
  submitStatus: 'success' | 'error' = 'success';
  serviceOptions: string[] = [
    'Tyres',
    'Wheel Alignment & Balancing',
    'Mini Valeting',
    'Full Valeting',
    'Mobile Tyre Fitting',
    'ADAS Radar Calibration'
  ];
  locationOptions: string[] = ['Location 1', 'Location 2', 'Location 3'];

  setTab(tab: string) {
    this.activeTab = tab;
  }

  formData = {
    user_name: '',
    service_type: '',
    address: '',
    location: '',
    city: '',
    warranty: '',
    description: ''
  };

  sendEmail() {
    const hasEmptyField = Object.values(this.formData).some(
      (value) => !value || !value.trim()
    );

    if (hasEmptyField) {
      this.submitStatus = 'error';
      this.submitMessage = 'Please fill all fields';
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    emailjs.send(
      'service_xwb556l',
      'template_bzp7xzl',
      this.formData,
      'bOcUDi3-jiZ0Nb52F'
    ).then(
      () => {
        this.submitStatus = 'success';
        this.submitMessage = 'Form submitted successfully';
        this.isSubmitting = false;
      },
      (error) => {
        console.log(error);
        this.submitStatus = 'error';
        this.submitMessage = 'Failed to send request. Please try again.';
        this.isSubmitting = false;
      }
    );

  }

}
