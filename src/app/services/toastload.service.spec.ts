import { TestBed } from '@angular/core/testing';

import { ToastloadService } from './toastload.service';

describe('ToastloadService', () => {
  let service: ToastloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
