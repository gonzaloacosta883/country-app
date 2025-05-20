import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout.component';
import { ByCountryPageComponent } from './pages/by-country-page/byCountryPage.component';
import { ByRegionPageComponent } from './pages/by-region-page/ByRegionPage.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const countryRoutes: Routes = [

    // Al no encontrar ninguna ruta con el path vacio
    // va a ** que va a by-capital
    {
        path: '',
        component: CountryLayoutComponent,
        children: [
            {
                path: 'by-capital',
                component: ByCapitalPageComponent
            },
            {
                path: 'by-country',
                component: ByCountryPageComponent
            },
            {
                path: 'by-region',
                component: ByRegionPageComponent
            },
            {
                path: 'by/:countryCode',
                component: CountryPageComponent
            },
            {
                path: '**',
                redirectTo: 'by-capital'
            }
        ]
    }
];

export default countryRoutes;
