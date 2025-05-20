import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/Country.service';
import { Region } from '../../interfaces/region.type';

@Component({
	selector: 'app-by-region-page',
	imports: [CountryListComponent],
	templateUrl: './ByRegionPage.component.html'
})
export class ByRegionPageComponent {

	public regions: Region[] = [
		'Africa',
		'Americas',
		'Asia',
		'Europe',
		'Oceania',
		'Antarctic',
	];

	private countryService = inject(CountryService);

	isLoading = signal(false);
	isError = signal<string | null>(null);
	countries = signal<Country[]>([]);

	// Guardo la region activa.
	selectedRegion = signal<Region|null>(null);

	searchByRegion(query: Region): void {

		// Estoy buscando espera a que termine.
		if (this.isLoading() === true) return;
		
		this.isLoading.set(true);
		this.isError.set(null);

		this.countryService.searchCountriesByRegion(query).subscribe({
			next: (countries) => {
				this.isLoading.set(false);
				this.countries.set(countries);
			},
			error: (err) => {
				this.isLoading.set(false);
				this.countries.set([]);
				this.isError.set(err);
			}
		})
	}

	updateSelectedRegion( region: Region ): void {
		this.selectedRegion.set(region);
	}

}
