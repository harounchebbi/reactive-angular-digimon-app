import { Component, OnInit } from "@angular/core";
import { DigimonService } from "../../services/digimon.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-digimon-table",
  templateUrl: "./digimon-table.component.html",
  styleUrls: ["./digimon-table.component.css"],
})
export class DigimonTableComponent implements OnInit {
  digimons$ = this.digimonService.digimons$;
  levels = [
    { digivolution: "All" },
    { digivolution: "Fresh" },
    { digivolution: "In Training" },
    { digivolution: "Rookie" },
    { digivolution: "Champion" },
    { digivolution: "Ultimate" },
    { digivolution: "Mega" },
    { digivolution: "Armor" },
  ];
  constructor(
    private digimonService: DigimonService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {}
}
