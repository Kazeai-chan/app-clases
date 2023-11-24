import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgreAutoPage } from './agre-auto.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AgreAutoPage', () => {
  let component: AgreAutoPage;
  let fixture: ComponentFixture<AgreAutoPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AgreAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
