import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { classLivroVolumeInfo } from 'src/app/models/livrosVolumeInfo';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Livro[];
  searchField: string = '';
  subscription: Subscription
  livro: Livro

  constructor(private service: BookService) { }

  getTheBooks() {
    this.subscription = this.service.getBooks(this.searchField).subscribe(
      // (returnFromAPI) => console.log(returnFromAPI), (error) => { console.log(error); } //DESATUALIZADA
      //Novo método para passar parâmetros para o subscribe
      {
        // next: returnFromAPI => console.log(returnFromAPI), //Poder ser emitido vários valores durante sua existência
        next: itens => {
          this.listaLivros = this.livrosResultadoParaLivros(itens)
        },
        error: erro => console.error(erro), //Opcional - Encerra o ciclo de vida
        complete: () => console.log('Observable completado') //Opcional - Encerra o ciclo de vida
      }
    )
  }

  livrosResultadoParaLivros(items: Item[]): classLivroVolumeInfo[] {
    // const livros: Livro[] = []
    // items.forEach(item => {
    //   livros.push(this.livro = {
    //     title: item.volumeInfo?.title,
    //     authors: item.volumeInfo?.authors,
    //     publisher: item.volumeInfo?.publisher,
    //     publishedDate: item.volumeInfo?.publishedDate,
    //     description: item.volumeInfo?.description,
    //     previewLink: item.volumeInfo?.previewLink,
    //     thumbnail: item.volumeInfo?.imageLinks?.thumbnail
    //   })
    // });
    // return livros

    return items.map(item => {
      return new classLivroVolumeInfo(item)
    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}



