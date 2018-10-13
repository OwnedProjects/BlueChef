import { TestBed, inject } from '@angular/core/testing';

import { InventoryinService } from './inventoryin.service';

describe('InventoryinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryinService]
    });
  });

  it('should be created', inject([InventoryinService], (service: InventoryinService) => {
    expect(service).toBeTruthy();
  }));
});
