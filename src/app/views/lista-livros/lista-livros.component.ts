import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, Subscription, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { Item, Livro, LivrosResultados } from 'src/app/models/interfaces';
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

  listaLivros: Livro[];
  // searchField: string = '';
  searchField = new FormControl()
  // subscription: Subscription
  // livro: Livro

  mensagemError = '';
  livrosResultado: LivrosResultados;

  constructor(private service: BookService) { }

  // totalDeLivros$ = this.searchField.valueChanges.pipe(
  //   debounceTime(pausa),
  //   filter((valorDigitado) => valorDigitado.length >= 3),
  //   tap(() => console.log('Fluxo inicial')),
  //   distinctUntilChanged(),
  //   switchMap((valorDigitado) => this.service.getBooks(valorDigitado)),
  //   map(resultado => this.livrosResultado = resultado),
  //   catchError(err => {
  //     console.log(err)
  //     return of()//Também pode ser usado como o EMPTY, mas aí ele pode emitir um valor. RECEBE PARÂMETROS
  //   })
  // )

  //CONVENÇÃO DA COMUNIDADE = USAR SÍMBOLO DE DOLAR NO FINAL QUANDO A VARIÁVEL REPRESENTAR UM OBSERVABLE
  livrosEncontrados$ = this.searchField.valueChanges.pipe( //valueChange retorna um Observable, então posso usar o pipe
    debounceTime(pausa),
    tap(() => console.log('Fluxo inicial')),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(), //Permite a requisição apenas quando há alterações. Evitando requisições seguidas pelo mesmo termo Ex: Mar, ma, mar
    switchMap((valorDigitado) => this.service.getBooks(valorDigitado)), //O switchMap cancela todas as requisições anteriores. Passando apenas o último valor
    // tap((retornoDaAPI) => console.log('RetornoTAP', retornoDaAPI)),
    // map(resultado => this.livrosResultado = resultado),
    map(resultado => this.livrosResultado = resultado),
    map(resultado => resultado.items ?? []),
    // map(resultado => ),
    map(itens => //OBS: Arrow function com chave NÃO DÁ RETORNO. Tirando-os, implicita o retorno no ngFor do template
      // this.listaLivros = this.livros.ResultadoParaLivros(itens)
      this.livrosResultadoParaLivros(itens)
    ),
    catchError(error => { //O  catchError, não emite valores. Apenas captura o error. O throwError, retorna um observable. E termina seu ciclo de vida
      //O EMPTY é um callback quando eu não quiser fazer nada. Encerrando o cilco de vida do observable.
      //OBS: POR ISSO É NECESSÁRIO RECARREGAR A APLICAÇÃO, POIS COMO O COMPLETE, O EMPTY TAMBÉM ENCERRA O CICLO DE VIDA
      this.mensagemError = 'Ops, houve um erro. Recarregue a aplicação'
      return EMPTY
      // console.log(error)
      // return throwError(() => new Error(this.mensagemError = 'Ops, deu errado. Recarregue a aplicação'))
    })
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



/*
switchMap - Operador de Transformação. Cancela requisições de observables anteriores,
emitindo valores apenas do Observable projetado mais recentemente.

filter - Operador de filtragem. Filtra os itens emitidos pelo Observable de origem,
permitindo apenas aqueles que satisfaçam uma condição especificada.

debounceTime - Operador de filtragem. Retorna um Observable
que atrasa as emissões do Observable de origem pelo tempo especificado.

distinctUntilChanged - Operador de filtragem. Retorna um Observable que emite todos os valores enviados
pelo observable de origem se forem distintos em comparação com o último valor emitido pelo observable de resultado.

*/
