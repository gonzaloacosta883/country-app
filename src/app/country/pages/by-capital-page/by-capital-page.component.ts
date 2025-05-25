import { Component, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/Country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-by-capital-page',
	imports: [SearchInputComponent, CountryListComponent],
	templateUrl: './by-capital-page.component.html',
	styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

	private countryService = inject(CountryService);

	router = inject(Router);
	activatedRoute = inject(ActivatedRoute);
	// snapshot es una fotografia del momento.
	// si quiero estar pendiente al cambio de url
	// seria mejor subscribirme a los cambios del activatedRoute.
	queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
	query = linkedSignal(() => this.queryParam);

	
	countryResource = rxResource({
		request: () => ({ query: this.query() }),
		loader: ({ request }) => {
			if(!request.query) return of([]);
			
			// navegar pasando parametros.
			this.router.navigate(['/country/by-capital'], {
				queryParams: {
					query: request.query
				}
			});

			return this.countryService.searchByCapital(request.query);
		},
	});

	setQuery( query: string ) {
		this.query.set(query);
	}

}
