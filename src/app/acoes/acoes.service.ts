import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, pluck } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private httpClient: HttpClient) {}

  getAcoes(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.httpClient
      .get<AcoesAPI>('http://localhost:3000/acoes', { params })
      .pipe(
        tap((valor) => console.log(valor)),
        pluck('payload'),
        map((acoes) =>
          acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))
        )
      );
  }

  private ordenaPorCodigo(acaoA: Acao, AcaoB: Acao) {
    if (acaoA.codigo > AcaoB.codigo) {
      return 1;
    }
    if (acaoA.codigo < AcaoB.codigo) {
      return -1;
    }
    return 0;
  }
}