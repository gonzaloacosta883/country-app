import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/Country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInformationComponent } from './country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {

  // Esto crea un signal llamado query que automáticamente 
  // se actualiza cada vez que cambia el parámetro query de 
  // la ruta (por ejemplo, /buscar?query=perros).
  // code = toSignal(
  //   inject(ActivatedRoute).params.pipe(map((params) => params['code']))
  // );

  countryService = inject(CountryService);
  countryCode = inject(ActivatedRoute).snapshot.params['countryCode'];

  countryResource = rxResource({
    // Argumento que quiero pasar a la funcion loader()
    // en este caso code.
    request: () => ({code: this.countryCode}),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCODE(request.code)
    }
  })

}
