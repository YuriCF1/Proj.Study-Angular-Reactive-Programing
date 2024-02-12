import { Component } from '@angular/core';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  listaLivros: [];
  searchField: string = '';

  constructor(private service: BookService) { }

  getTheBooks() {
    this.service.getBooks(this.searchField).subscribe(
      // (returnFromAPI) => console.log(returnFromAPI), (error) => { console.log(error); } //DESATUALIZADA
      //Novo método para passar parâmetros para o subscribe
      {
        next: returnFromAPI => console.log(returnFromAPI), //Poder ser emitido vários valores durante sua existência
        error: erro => console.error(erro), //Opcional - Encerra o ciclo de vida
        complete: () => console.log('Observable completado') //Opcional - Encerra o ciclo de vida
      }
    )
  }
}



