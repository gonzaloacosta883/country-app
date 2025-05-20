import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, map, Observable, throwError, delay, of, tap, pipe } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';

import type { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
	providedIn: 'root'
})
export class CountryService {

	private http = inject(HttpClient);

	// Almacena pares de clave valor.
	private queryCacheCapital = new Map<string, Country[]>();
	private queryCacheCountry = new Map<string, Country[]>();
	private queryCacheRegion = new Map<string, Country[]>();

	searchByCapital(query: string): Observable<Country[]> {


		query = query.toLocaleLowerCase();

		// console.log("Contenido del map");
		// console.log(this.queryCacheCapital);

		// Verifico si existe la clave en el map.
		// y si lo esta retorno el valor
		if (this.queryCacheCapital.has(query)) {
			return of(this.queryCacheCapital.get(query) ?? []);
		}

		console.log(`Haciendo peticion al servidor ${query}`);

		return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
			.pipe(
				// restCountries es el observable de la peticion http.
				map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
				tap( countries => this.queryCacheCapital.set(query, countries) ),
				catchError((error) => {
					// console.log('Error fetching ', error);
					return throwError(() => new Error(`No se pudieron obtener paises con esa query ${query}`))
				})
			);
	}

	searchByCountry(query: string): Observable<Country[]> {

		query = query.toLocaleLowerCase();

		if (this.queryCacheCountry.has(query)) {
			// of() Retorna un observable.
			return of(this.queryCacheCountry.get(query) ?? []).pipe(delay(2000));
		}

		console.log(`Haciendo peticion al servidor por country ${query}`);

		return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
			.pipe(
				// restCountries es el observable de la peticion http.
				map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
				tap( countries => this.queryCacheCountry.set(query, countries)),
				delay(2000),
				catchError((error) => {
					// console.log('Error fetching ', error);
					return throwError(() => new Error(`No se pudieron obtener paises con esa query ${query}`))
				})
			);
	}

	searchCountryByAlphaCODE(code: string) {

		return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
			.pipe(
				// restCountries es el observable de la peticion http.
				map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
				// Solo obtento el primero elemento
				map(countries => countries.at(0)),
				catchError((error) => {
					// console.log('Error fetching ', error);
					return throwError(() => new Error(`No se encontro un páis con ese código ${code}`))
				})
			);
	}

	searchCountriesByRegion(region: Region) {

		if (this.queryCacheRegion.has(region)) {
			return of(this.queryCacheRegion.get(region) ?? []);
		}

		console.log(`Llamo al servicio para obtener paises por la region ${region}`)
		return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
			.pipe(
				// restCountries es el observable de la peticion http.
				map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
				tap(countries => this.queryCacheRegion.set(region, countries)),
				catchError((error) => {
					// console.log('Error fetching ', error);
					return throwError(() => new Error(`No se encontraron paises en esa región ${region}`))
				})
			);
	}

}
