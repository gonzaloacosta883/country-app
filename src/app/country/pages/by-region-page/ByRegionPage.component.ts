import { Component } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './ByRegionPage.component.html'
})
export class ByRegionPageComponent { }
