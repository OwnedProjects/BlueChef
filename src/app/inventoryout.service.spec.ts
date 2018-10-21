import { TestBed, inject } from '@angular/core/testing';

import { InventoryoutService } from './inventoryout.service';

describe('InventoryoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryoutService]
    });
  });

  it('should be created', inject([InventoryoutService], (service: InventoryoutService) => {
    expect(service).toBeTruthy();
  }));
});
