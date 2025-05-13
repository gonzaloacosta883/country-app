import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/Country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
	selector: 'app-by-capital-page',
	imports: [SearchInputComponent, CountryListComponent],
	templateUrl: './by-capital-page.component.html',
	styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

	private countryService = inject(CountryService);

	isLoading = signal(false);
	isError = signal<string | null>(null);
	countries = signal<Country[]>([]);

	recibirOnSerchEmitter(query: string): void {

		// Estoy buscando espera a que termine.
		if (this.isLoading() === true) return;

		this.isLoading.set(true);
		this.isError.set(null);

		this.countryService.searchByCapital(query).subscribe({
			next: (countries) => {
				this.isLoading.set(false);
				this.countries.set(countries);
			},
			error: ( err ) => {
				this.isLoading.set(false);
				this.countries.set([]);
				this.isError.set(err);
			}
		}
			
		);
		// console.log(`Recibí del componente seach-input el valor: ${query}`);
	}

}
