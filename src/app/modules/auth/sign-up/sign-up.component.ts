import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/http/auth.service';
import { SweetAlert2Service } from 'ng-urxnium';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  userNameMessage: string;
  emailMessage: string;
  load: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private swal: SweetAlert2Service,
    public router: Router
  ) {
    this.createForm();
    this.load = false;
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.load = true;
    this.form.disable();

    this.authService.signUp(this.form.value).subscribe(
      message => {
        this.swal.fire({
          icon: 'success',
          title: '¡En hora buena!',
          text: message,
          theme: 'material'
        }).subscribe(_ => {
          this.router.navigate(['/auth/sign-in']);
        });

        this.form.enable();
        this.load = false;
      }, error => {
        this.form.enable();
        this.load = false;

        if (error.includes('nombre de usuario')) {
          this.form.get('userName').setErrors({ repeat: true });
          this.userNameMessage = error;
          return;
        }

        if (error.includes('correo')) {
          this.form.get('email').setErrors({ repeat: true });
          this.emailMessage = error;
          return;
        }

        this.swal.fire({
          icon: 'error',
          title: 'Hubo un problema hacer el registro',
          text: error.message,
          theme: 'material'
        });
      }
    );
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      motherSurname: ['', Validators.required],
      userName: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.pattern(
            /^\d{2}[- ]?\d{2}[- ]?\d{2}[- ]?\d{2}[- ]?\d{2}$/
          )
        ])
      ]
    });
  }

}
