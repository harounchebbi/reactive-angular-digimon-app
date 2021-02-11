import { Component, OnInit } from "@angular/core";
import { DigimonService } from "../../services/digimon.service";
import { BehaviorSubject, combineLatest } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { Digimon } from "../../Digimon";

@Component({
  selector: "app-digimon-table",
  templateUrl: "./digimon-table.component.html",
  styleUrls: ["./digimon-table.component.css"],
})
export class DigimonTableComponent implements OnInit {
  digimons$ = this.digimonService.digimons$;
  searchByLevel$ = new BehaviorSubject([]);
  searchByName$ = new BehaviorSubject([]);
  digimonList: Digimon[];
  isError = false;
  isDisplayed = true;
  levels = [
    { digivolution: "All" },
    { digivolution: "Fresh" },
    { digivolution: "In Training" },
    { digivolution: "Rookie" },
    { digivolution: "Champion" },
    { digivolution: "Ultimate" },
    { digivolution: "Mega" },
    { digivolution: "Armor" }
  ];
  constructor(
    private digimonService: DigimonService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this.loadAllDigimons();

    combineLatest([this.searchByLevel$, this.searchByName$])
      .pipe(
        map(([searchByLevel, searchByName]) => {
          if (searchByLevel.length == 0) {
            this.digimonList = [];
            this.digimonList = searchByName;
            
          } else {
            const filtredElements = searchByName.filter((el) =>
              searchByLevel.find((d) => d.level == el.level)
            );
            this.digimonList = [...filtredElements];
          }
        })
      )
      .subscribe((data) => {
        //console.log(data);
      });
  }

  loadAllDigimons() {
    this.spinner.show();
    this.digimons$.pipe(finalize(() => this.spinner.hide())).subscribe((data) => {
      this.digimonList = data;
    });
  }

  filterDigimons(event) {
    this.digimonService.getDigimonsByLevel(event.value).subscribe((res) => {
      this.searchByLevel$.next(res);
      this.digimonList = [];
      this.digimonList = res;
    });
  }

  searchDigimon(event) {
    this.spinner.show();
    this.digimonService
      .getDigimonsByName(event.target.value)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (res) => {
          this.searchByName$.next(res);
          this.isError = false;
          this.isDisplayed = true;
        },
        () => {
          this.isError = true;
          this.isDisplayed = false;
        }
      );
  }
}
