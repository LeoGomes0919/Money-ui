import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/Http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';

export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';
  private token: string;

  constructor(private http: HttpClient) {
    this.setAccessToken();
  }

  setAccessToken() {
    // tslint:disable-next-line: max-line-length
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTcyNzY2MTYyLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI2ZTA2NTNkMC00ZGE4LTQyNjQtOWE0ZC00OWU1OTczNzkyYmIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.rwGPCegln69wSPrTV1Os9SYzLV6dUFlPxE1374EnWRU';
  }

  pesquisar(filtro: PessoaFilter): Promise<any> {
    const headerSettings: { [name: string]: string | string[]; } = {};
    let params = new HttpParams();

    // tslint:disable-next-line: no-string-literal
    headerSettings['Authorization'] = 'Bearer ' + this.token;
    headerSettings['Content-Type'] = 'application/json';

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    const newHeraderAut = new HttpHeaders(headerSettings);
    return this.http.get<any>(`${this.pessoasUrl}`, { headers: newHeraderAut, params })
      .toPromise()
      .then(response => {
        const pessoas = response.content;

        const resultado = {
          pessoas,
          total: response.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    const headerSettings: { [name: string]: string | string[]; } = {};

    // tslint:disable-next-line: no-string-literal
    headerSettings['Authorization'] = 'Bearer ' + this.token;

    const newHeraderAut = new HttpHeaders(headerSettings);
    return this.http.get<any>(this.pessoasUrl, { headers: newHeraderAut })
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    const headerSettings: { [name: string]: string | string[]; } = {};

    // tslint:disable-next-line: no-string-literal
    headerSettings['Authorization'] = 'Bearer ' + this.token;
    headerSettings['Content-Type'] = 'application/json';

    const newHeraderAut = new HttpHeaders(headerSettings);
    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers: newHeraderAut })
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<any> {
    const headerSettings: { [name: string]: string | string[]; } = {};

    // tslint:disable-next-line: no-string-literal
    headerSettings['Authorization'] = 'Bearer ' + this.token;
    headerSettings['Content-Type'] = 'application/json';

    const newHeraderAut = new HttpHeaders(headerSettings);
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers: newHeraderAut })
      .toPromise()
      .then(() => null);
  }

  adicionarPessoa(pessoa: Pessoa): Promise<Pessoa> {
    const headerSettings: { [name: string]: string | string[]; } = {};

    // tslint:disable-next-line: no-string-literal
    headerSettings['Authorization'] = 'Bearer ' + this.token;
    headerSettings['Content-Type'] = 'application/json';

    const newHeraderAut = new HttpHeaders(headerSettings);
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers: newHeraderAut })
      .toPromise()
      .then(response => {
        const pess = response;
        return pess;
      });
  }

  bucarPorCodigo(codigo: number): Promise<Pessoa> {
    const headerSettings: { [name: string]: string | string[]; } = {};

    // tslint:disable-next-line: no-string-literal
    headerSettings['Authorization'] = 'Bearer ' + this.token;
    headerSettings['Content-Type'] = 'application/json';

    const newHeraderAut = new HttpHeaders(headerSettings);
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, { headers: newHeraderAut })
      .toPromise()
      .then(response => response);
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headerSettings: { [name: string]: string | string[]; } = {};

    // tslint:disable-next-line: no-string-literal
    headerSettings['Authorization'] = 'Bearer ' + this.token;
    headerSettings['Content-Type'] = 'application/json';

    const newHeraderAut = new HttpHeaders(headerSettings);
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers: newHeraderAut })
      .toPromise()
      .then(response => response);
  }
}
