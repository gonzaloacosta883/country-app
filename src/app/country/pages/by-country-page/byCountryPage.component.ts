import { Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/Country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
	selector: 'app-by-country-page',
	imports: [SearchInputComponent, CountryListComponent],
	templateUrl: './byCountryPage.component.html'
})
export class ByCountryPageComponent {

	private countryService = inject(CountryService);

	router = inject(Router);
	activatedRoute = inject(ActivatedRoute);
	queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
	
	query = linkedSignal(() => this.queryParam);

	countryResource = rxResource({
		request: () => ({ query: this.query() }),
		loader: ({ request }) => {
			if (!request.query) return of([]);

			// navegar pasando parametros.
			this.router.navigate(['/country/by-country'], {
				queryParams: {
					query: request.query
				}
			});

			return this.countryService.searchByCountry(request.query);
		},
	});

	setQuery(query: string) {
		this.query.set(query);
	}
}