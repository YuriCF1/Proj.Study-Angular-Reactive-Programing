import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Livro, LivrosResultados } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'
  // private readonly API = 'https://www.googleapis.com/books/v1/volumeERROR'

  constructor(private http: HttpClient) { }

  getBooks(valueTyped: string): Observable<LivrosResultados> {
    const params = new HttpParams().append('q', valueTyped)
    return this.http.get<LivrosResultados>(this.API, { params }).pipe(//Deve também ser tipada no get, não apenas na função da requisição
      tap<LivrosResultados>(retornoAPI => console.log(retornoAPI))
    )
  }
}


/*

O operador tap no Angular é utilizado para realizar ações secundárias (side effects)
em um fluxo de observáveis sem modificar o valor do próprio observável.
Ele é frequentemente usado para depuração, registro de logs ou execução de
código adicional sem afetar os dados do observável principal.

EX:

const observable = of(1, 2, 3);

observable.pipe(
  tap(value => console.log('Antes do filtro:', value)),
  filter(value => value > 1),
  tap(value => console.log('Depois do filtro:', value))
).subscribe();
*/
