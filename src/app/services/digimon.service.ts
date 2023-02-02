import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Digimon } from '../Digimon';

@Injectable({
  providedIn: "root",
})
export class DigimonService {
  constructor(private httpClient: HttpClient) {}

  digimons$ = this.httpClient.get<Digimon[]>(`${environment.DIGIMON_API_URL}`);


}
