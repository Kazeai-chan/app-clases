import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: true,
  imports:[IonicModule],
})
export class PageNotFoundComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  volverPagina(pagina: string) {
    this.router.navigate([pagina]).then(() => {
      history.replaceState(null, '', pagina);
    });
  }
}
