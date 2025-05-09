import { Component, signal } from '@angular/core';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html'
})
export class CountryListComponent {

  public country = signal("");

}
