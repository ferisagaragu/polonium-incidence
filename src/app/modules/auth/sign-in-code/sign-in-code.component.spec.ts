import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInCodeComponent } from './sign-in-code.component';

describe('SignInCodeComponent', () => {
  let component: SignInCodeComponent;
  let fixture: ComponentFixture<SignInCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
