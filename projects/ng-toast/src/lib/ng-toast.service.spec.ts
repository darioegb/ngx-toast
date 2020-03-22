import { TestBed } from '@angular/core/testing';

import { NgToastService } from './ng-toast.service';

describe('NgToastService', () => {
  let service: NgToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
