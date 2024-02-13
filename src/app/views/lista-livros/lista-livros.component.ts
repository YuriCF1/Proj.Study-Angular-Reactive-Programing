import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: [];
  searchField: string = '';

  subscription: Subscription

  constructor(private service: BookService) { }

  getTheBooks() {
    this.subscription = this.service.getBooks(this.searchField).subscribe(
      // (returnFromAPI) => console.log(returnFromAPI), (error) => { console.log(error); } //DESATUALIZADA
      //Novo método para passar parâmetros para o subscribe
      {
        next: returnFromAPI => console.log(returnFromAPI), //Poder ser emitido vários valores durante sua existência
        error: erro => console.error(erro), //Opcional - Encerra o ciclo de vida
        complete: () => console.log('Observable completado') //Opcional - Encerra o ciclo de vida
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}



