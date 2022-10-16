/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { CommonModule } from "@angular/common";
import { Component, NgModule, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
  templateUrl: "./templates/test-01.html",
  // selector : 'ng-app',
  // template : `<div>
  //                 <h2>Loan Details</h2>
  //                 <b>Monthly Payment:</b> {{monthly_payment}} <br/>
  //                 <b>Late Payment Fee : {{late_payment}}</b> <br/>
  //             </div>`
})
export class Test01Component implements OnInit {
  loan_amount: number = 1000;
  monthly_payment: string | number;
  late_payment: string | number;

  ngOnInit() {
    this.updateValues();
  }

  loanAmountChanged(event) {
    console.log("called", event.target.valueAsNumber);
    this.loan_amount = event.target.valueAsNumber;
    this.updateValues();
  }
  updateValues() {
    if (this.loan_amount <= 0) {
      this.monthly_payment = "N/A";
      this.late_payment = "N/A";
    } else {
      this.monthly_payment = this.loan_amount * 0.02;
      this.late_payment = this.monthly_payment * 0.05;
    }
  }
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: Test01Component,
      },
    ]),
    FormsModule,
    CommonModule
  ],
  declarations: [Test01Component],
})
export class Test01Module {}
