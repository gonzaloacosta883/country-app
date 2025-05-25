import { Component, input, linkedSignal, output, signal } from '@angular/core';

@Component({
	selector: 'country-search-input',
	imports: [],
	templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

	placeholder = input('Buscar');
	initialValue = input<string>();
	
	// Inicializar una señal.
	inputValue = linkedSignal<string>(() => this.initialValue() ?? '');
	
	valueInputSearch = output<string>();
	onSearch(search: string): void {
		this.valueInputSearch.emit(search);
	}

}
