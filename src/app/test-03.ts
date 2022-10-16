/**
 * Update the following components to meet the requirements :
 *
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 *
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 *
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "ng-app",
  template: `<form (ngSubmit)="onSubmit()" method="POST">
    <h2>Login</h2>
    <br />
    <input type="email" [(ngModel)]="email" name="email" />
    <br />
    <span *ngIf="emailError" style="color: red;">Incorrect email</span>
    <br />
    <input type="password" [(ngModel)]="password" name="password" />
    <br />
    <span *ngIf="passwordError" style="color: red;">Incorrect Password</span>
    <br /><br />
    <button type="submit">Submit</button>
    <br /><br />
    <div *ngIf="logged_in">Logged In!</div>
  </form>`,
})
export class Test03Component {
  email: string = "";
  password: string = "";
  logged_in = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  onSubmit() {
    console.log("form submitted");
    this.validateEmail(this.email) ? this.emailError = false : this.emailError = true;
    this.validatePassword(this.password) ? this.passwordError = false : this.passwordError = true;
        
    if (!this.emailError && !this.passwordError)
        this.logged_in = true;
  }
  validateEmail(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  validatePassword(pwd) {
    return pwd.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    );
  };
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: Test03Component,
      },
    ]),
    FormsModule,
  ],
  declarations: [Test03Component],
})
export class Test03Module {}
