import { TestBed } from '@angular/core/testing';

import { DigimonService } from './digimon.service';

describe('DigimonService', () => {
  let service: DigimonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigimonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
