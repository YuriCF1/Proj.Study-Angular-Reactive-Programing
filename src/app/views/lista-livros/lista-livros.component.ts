import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, filter, map, switchMap, tap } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { classLivroVolumeInfo } from 'src/app/models/livrosVolumeInfo';
import { BookService } from 'src/app/service/book.service';

const pausa = 600;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
// export class ListaLivrosComponent implements OnDestroy {
export class ListaLivrosComponent {

  // listaLivros: Livro[];
  // searchField: string = '';
  searchField = new FormControl()
  // subscription: Subscription
  // livro: Livro

  constructor(private service: BookService) { }

  //CONVENÇÃO DA COMUNIDADE = USAR SÍMBOLO DE DOLAR NO FINAL QUANDO A VARIÁVEL REPRESENTAR UM OBSERVABLE
  livrosEncontrados$ = this.searchField.valueChanges.pipe( //valueChange retorna um Observable, então posso usar o pipe
    debounceTime(pausa),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log('Fluxo inicial')),
    switchMap((valorDigitado) => this.service.getBooks(valorDigitado)), //O switchMap cancela todas as requisições anteriores. Passando apenas o último valor
    tap((retornoDaAPI) => console.log(retornoDaAPI)),
    map(itens => //OBS: Arrow function com chave NÃO DÁ RETORNO. Tirando-os, implicita o retorno no ngFor do template
      // this.listaLivros = this.livrosResultadoParaLivros(itens)
      this.livrosResultadoParaLivros(itens)
    ),
  )


  /*
  getTheBooks() {
    this.subscription = this.service.getBooks(this.searchField).subscribe(
      // (returnFromAPI) => console.log(returnFromAPI), (error) => { console.log(error); } //DESATUALIZADA
      //Novo método para passar parâmetros para o subscribe
      {
        // next: returnFromAPI => console.log(returnFromAPI), //Poder ser emitido vários valores durante sua existência
        next: itens => {
          console.log('Requisição feita');
          this.listaLivros = this.livrosResultadoParaLivros(itens)
        },
        error: erro => console.error(erro), //Opcional - Encerra o ciclo de vida
        // complete: () => console.log('Observable completado') //Opcional - Encerra o ciclo de vida
      }
    )
  }
*/

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

  // ngOnDestroy() {
  //   this.subscription.unsubscribe()
  // }
}



