import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecContPage } from './rec-cont.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecContPage', () => {
  let component: RecContPage;
  let fixture: ComponentFixture<RecContPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(RecContPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});