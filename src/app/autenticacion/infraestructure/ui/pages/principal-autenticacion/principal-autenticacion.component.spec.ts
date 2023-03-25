import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAutenticacionComponent } from './principal-autenticacion.component';

describe('PrincipalAutenticacionComponent', () => {
  let component: PrincipalAutenticacionComponent;
  let fixture: ComponentFixture<PrincipalAutenticacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalAutenticacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalAutenticacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
