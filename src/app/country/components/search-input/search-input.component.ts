import { Component, input, output } from '@angular/core';

@Component({
	selector: 'country-search-input',
	imports: [],
	templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

	placeholder = input('Buscar');
	valueInputSearch = output<string>();

	onSearch(search: string): void {
		this.valueInputSearch.emit(search);
	}

}
