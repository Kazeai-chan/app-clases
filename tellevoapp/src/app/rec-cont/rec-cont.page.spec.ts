import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecContPage } from './rec-cont.page';

describe('RecContPage', () => {
  let component: RecContPage;
  let fixture: ComponentFixture<RecContPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(RecContPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});