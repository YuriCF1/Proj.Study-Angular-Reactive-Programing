import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, Livro, LivrosResultados } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'
  // private readonly API = 'https://www.googleapis.com/books/v1/volumeERROR'

  constructor(private http: HttpClient) { }

  getBooks(valueTyped: string): Observable<Item[]> {
    const params = new HttpParams().append('q', valueTyped)
    return this.http.get<LivrosResultados>(this.API, { params }).pipe(//Deve também ser tipada no get, não apenas na função da requisição
      tap<LivrosResultados>(retornoAPI => console.log('Antes do map', retornoAPI)),
      map(resultado => resultado.items),
      tap(resultado => console.log('Fluxo após o map:', resultado))
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


/*
Um Operador é uma função que cria um novo Observable com base no Observable atual.
Esta é uma operação pura: o Observable anterior permanece inalterado.
O pipe agrupa operadores, não modifica o fluxo inicial de dados retornados.

Operadores são funções variadas que permitem combinar rapidamente diferentes observables
para obter diferentes tipos de resultados. O operador tap não vai modificar o observable anterior, por isso,
diferentemente dos outros operadores, não precisamos nos preocupar com a ordem dele.
*/
