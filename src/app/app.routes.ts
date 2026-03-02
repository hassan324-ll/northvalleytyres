import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PriceMatch } from './pages/price-match/price-match';
import { Tyres } from './pages/tyres/tyres';
import { NewTyre } from './pages/new-tyre/new-tyre';
import { WheeAligmentBalancing } from './pages/whee-aligment-balancing/whee-aligment-balancing';
import { Adas } from './pages/adas/adas';
import { Valeting } from './pages/valeting/valeting';
import { MiniCarValet } from './pages/mini-car-valet/mini-car-valet';
import { FullCarValet } from './pages/full-car-valet/full-car-valet';
import { MobileFitting } from './pages/mobile-fitting/mobile-fitting';
import { Events } from './pages/events/events';
import { AboutUs } from './pages/about-us/about-us';
import { ContactUs } from './pages/contact-us/contact-us';
import { TyresGallery } from './pages/tyres-gallery/tyres-gallery';
import { ValetingGallery } from './pages/valeting-gallery/valeting-gallery';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'price-match',
        component: PriceMatch
    },
    {
        path: 'tyres',
        component: Tyres
    },
    {
        path: 'new-tyre',
        component: NewTyre
    },
    {
        path: 'wheel-alignment-balancing',
        component: WheeAligmentBalancing
    },
    {
        path: 'adas',
        component: Adas
    },
    {
        path: 'valeting',
        component: Valeting
    },
    {
        path: 'mini-car-valet',
        component: MiniCarValet
    },
    {
        path: 'full-car-valet',
        component: FullCarValet
    },
    {
        path: 'mobile-fitting',
        component: MobileFitting
    },
    {
        path: 'events',
        component: Events
    },
    {
        path: 'about-us',
        component: AboutUs
    },
    {
        path: 'contact-us',
        component: ContactUs
    },
    {
        path: 'tyres-gallery',
        component: TyresGallery
    },
    {
        path: 'valeting-gallery',
        component: ValetingGallery
    },
    {
        path: '**',
        component: NotFound
    }
];
