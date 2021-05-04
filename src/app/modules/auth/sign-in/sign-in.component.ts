import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/http/auth.service';
import { Router } from '@angular/router';
import { SessionService, SweetAlert2Service } from 'ng-urxnium';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  form: FormGroup;
  userNameServerMessage: String;
  passwordServerMessage: String;
  showPassword: boolean;
  load: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private swal: SweetAlert2Service,
    public router: Router
  ) {
    this.createForm();
    this.showPassword = false;
    this.load = false;
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.load = true;
    this.form.disable();

    this.authService.signIn(this.form.value).subscribe(
      resp => {
        this.sessionService.signIn(resp.session, resp);
        this.form.enable();
        this.load = false;
        this.router.navigate(['dashboard']);
      }, error => {
        this.form.enable();
        this.load = false;

        if (error.includes('usuario')) {
          this.form.get('userName').setErrors({ badUserName: true});
          this.userNameServerMessage = error;
          return;
        }

        if (error.includes('contraseña')) {
          this.form.get('password').setErrors({ badPassword: true});
          this.passwordServerMessage = error;
          return;
        }

        this.swal.fire({
          icon: 'error',
          title: 'Hubo un problema al iniciar sesión',
          text: error,
          theme: 'material'
        });
      }
    );
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
