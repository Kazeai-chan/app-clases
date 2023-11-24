import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MailgunService } from './mailgun.service';

describe('MailgunService', () => {
  let service: MailgunService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(MailgunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
