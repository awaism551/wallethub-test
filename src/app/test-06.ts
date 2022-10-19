/**
 * Fix the following component so that it meets the requirements:
 * * The [textarea] becomes a user inputed property.
 * * The content that user inputs will preserve its whitespaces and linebreaks when printed under the [review_content] property
 * * It should not allow rendering of html tags to prevent a security vulnerability (keep the inner text however)
 * * If the user enters a link in the content (ex : https://wallethub.com) it should become an anchor element when printed in the page
 */
import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "ng-app",
  template: `
    <h2>User Review:</h2>
    <textarea
      class="textfield"
      placeholder="Write your Review"
      [(ngModel)]="review_input"
      (keyup)="textChanged()"
    ></textarea>
    <br /><br />
    <h3>Output:</h3>
    <pre class="output" [innerHTML]="review_content"></pre>
    <!-- <div class="output" [innerHTML]="review_content"></div> -->
  `,
  styles: [
    `
      .textfield {
        width: 600px;
        height: 220px;
        padding: 10px;
        box-sizing: border-box;
      }
    `,
    `
      .output {
        max-width: 100%;
        width: 600px;
        border: solid 1px #f9f6f6;
        padding: 5px;
        background: #ecebeb;
        white-space: pre;
      }
    `,
  ],
})
export class ReviewComponent {
  // sample input
  //     review_input =
  // `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  // Maecenas tincidunt vestibulum ligula, sed viverra erat tempus nec.

  // Pellentesque blandit mauris congue elit eleifend, facilisis tristique dolor dictum:
  //           1) Nulla et tempus orci
  //           2) Integer semper porttitor faucibus

  // At https://wallethub.com <b>bolded text</b>`
  review_input: string = "";
  review_content = "";

  textChanged() {
    this.review_content = this.replaceURLs();
  }

  replaceURLs() {
    if (!this.review_input) return;

    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return this.review_input.replace(urlRegex, function (url) {
      var hyperlink = url;
      if (!hyperlink.match("^https?://")) {
        hyperlink = "http://" + hyperlink;
      }
      return (
        '<a href="' +
        hyperlink +
        '" target="_blank" rel="noopener noreferrer">' +
        url +
        "</a>"
      );
    });
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: ReviewComponent,
      },
    ]),
    FormsModule,
  ],
  declarations: [ReviewComponent],
})
export class ReviewModule {}
