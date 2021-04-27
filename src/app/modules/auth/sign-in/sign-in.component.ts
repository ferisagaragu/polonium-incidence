import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/http/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  userNameServerMessage: String;
  passwordServerMessage: String;
  showPassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm();
    this.showPassword = false;
  }

  ngOnInit(): void { }

  save(): void {
    console.log(this.form.get('password'))


    if (this.form.invalid) {
      return;
    }

    this.authService.signIn(this.form.value).subscribe(
      resp => {
        console.log(resp);
      }, ({ error }) => {
        console.log(error.message);
        if (error.message.includes('usuario')) {
          this.form.get('userName').setErrors({ badUserName: true});
          this.userNameServerMessage = error.message;
        }

        if (error.message.includes('contraseña')) {
          this.form.get('password').setErrors({ badPassword: true});
          this.passwordServerMessage = error.message;
        }
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
