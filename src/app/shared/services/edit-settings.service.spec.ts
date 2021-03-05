import { TestBed } from '@angular/core/testing';

import { EditSettingsService } from './edit-settings.service';

describe('EditSettingsService', () => {
  let service: EditSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
