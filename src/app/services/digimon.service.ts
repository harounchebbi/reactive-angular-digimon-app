import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Digimon } from '../Digimon';

@Injectable({
  providedIn: "root",
})
export class DigimonService {
  constructor(private httpClient: HttpClient) {}

  digimons$ = this.httpClient.get<Digimon[]>(`${environment.DIGIMON_API_URL}`);

  getDigimonsByName(name: string): Observable<Digimon[]> {
    if (name === "") {
      return this.digimons$;
    }
    return this.httpClient.get<Digimon[]>(
      `${environment.DIGIMON_BY_NAME_API_URL}` + name
    );
  }

  getDigimonsByLevel(level: string): Observable<Digimon[]> {
    return this.httpClient.get<Digimon[]>(
      `${environment.DIGIMON_BY_LEVEL}` + level
    );
  }
}
