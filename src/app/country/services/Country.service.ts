import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';

import type { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
	providedIn: 'root'
})
export class CountryService {

	private http = inject(HttpClient);

	searchByCapital(query: string): Observable<Country[]> {
		query = query.toLocaleLowerCase();
		return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
			.pipe(
				// restCountries es el observable de la peticion http.
				map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
				catchError((error) => {
					console.log('Error fetching ', error);
					return throwError(() => new Error(`No se pudieron obtener paises con esa query ${query}`))
				})
			);
	}

}
