import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/Country.service';

@Component({
	selector: 'app-by-country-page',
	imports: [SearchInputComponent, CountryListComponent],
	templateUrl: './byCountryPage.component.html'
})
export class ByCountryPageComponent {

	private countryService = inject(CountryService);

	isLoading = signal(false);
	isError = signal<string | null>(null);
	countries = signal<Country[]>([]);

	recibirOnSerchEmitter(query: string): void {

		// Estoy buscando espera a que termine.
		if (this.isLoading() === true) return;

		this.isLoading.set(true);
		this.isError.set(null);


		this.countryService.searchByCountry(query).subscribe({
			next: (countries) => {
				this.isLoading.set(false);
				this.countries.set(countries);
			},
			error: ( err ) => {
				this.isLoading.set(false);
				this.countries.set([]);
				this.isError.set(err);
			}
		});

	}
}