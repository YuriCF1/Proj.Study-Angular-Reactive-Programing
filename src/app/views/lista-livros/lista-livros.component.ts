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
    this.service.getBooks(this.searchField).subscribe((returnFromAPI) => {
      console.log(returnFromAPI);
    })
  }
}



