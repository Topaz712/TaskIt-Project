import { Component, OnDestroy } from "@angular/core";
import { NgForm, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { HttpErrorResponse } from '@angular/common/http'
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  errorMsg: string | null = null;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router) { }

    onAuthSubmit(form: NgForm) {
      if (!form.valid) {
        return;
      }
      const email = form.value.email;
      const password = form.value.password;

      let authObs: Observable<AuthResponseData>

      if (this.isLoginMode) {
        authObs = this.authService.login(email, password);
      } else {
        authObs = this.authService.signup(email, password)
    }
      authObs.subscribe({
        next: (resData) => {
          console.log(resData);
          this.router.navigate(['/task-list']);
        },
        error: (res: HttpErrorResponse) => {
          console.log(res);
          this.errorMsg = res?.error?.error?.message || 'Something went wrong!';
        },
        complete: () => {
          console.log('Complete!');

          form.reset();
        }
      }
    );
  }
  nameValidator(): ValidatorFn {
    return (
      control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-Z0-9]+$/.test(control.value);

      return valid ? null : { invalidName: true };
    };
  }

  strongPasswordValidator(): ValidatorFn {
    return (
      control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const isValid =
        hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter;

      return isValid ? null : { invalidPasswordStrength: true };
    };
  }

  toggleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMsg = null;
  }

  ngOnDestroy(): void {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
