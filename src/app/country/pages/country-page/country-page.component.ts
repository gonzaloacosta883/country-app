import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  
  // Esto crea un signal llamado query que automáticamente 
  // se actualiza cada vez que cambia el parámetro query de 
  // la ruta (por ejemplo, /buscar?query=perros).
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map(( params ) => params['query']))  
  );
  
}
