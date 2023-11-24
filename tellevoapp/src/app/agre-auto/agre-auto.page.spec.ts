import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgreAutoPage } from './agre-auto.page';

describe('AgreAutoPage', () => {
  let component: AgreAutoPage;
  let fixture: ComponentFixture<AgreAutoPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(AgreAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
