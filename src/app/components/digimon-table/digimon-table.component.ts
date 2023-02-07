import { Component, OnInit } from '@angular/core';
import { DigimonService } from '../../services/digimon.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  merge,
  Observable,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Digimon } from 'src/app/Digimon';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-digimon-table',
  templateUrl: './digimon-table.component.html',
  styleUrls: ['./digimon-table.component.css'],
})
export class DigimonTableComponent implements OnInit {
  digimons$ = this.digimonService.digimons$.pipe(shareReplay(1));
  results$!: Observable<Digimon[]> | undefined;
  form!: FormGroup;

  constructor(
    private digimonService: DigimonService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      ctrl: [null],
    });
  }
  ngOnInit() {
    this.results$ = this.form?.get('ctrl')?.valueChanges.pipe(
      startWith(['']),
      distinctUntilChanged(),
      debounceTime(400),
      tap(() => this.spinner.show()),
      switchMap((entry: string) =>
        merge(this.digimons$).pipe(
          finalize(() => this.spinner.hide()),
          map((values: Digimon[]) =>
            values.filter((item: Digimon) =>
              item.name.toLowerCase().includes(entry)
            )
          )
        )
      )
    );
  }
}
