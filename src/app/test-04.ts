/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `
                <h2>Enter your first and last name</h2><br/>
                <label for="firstName">First Name</label>
                <input type="text" (blur)="generateUserName()" name="firstName" id="firstName" [(ngModel)]="firstName"/><br/>
                <label for="lastName">Last Name</label>
                <input type="text" (blur)="generateUserName()" name="lastName" id="lastName" [(ngModel)]="lastName"/><br/>
                <h3>Generated Username: {{userName}}</h3>
                `,
    styles : []
})
export class UserNameComponent {
    public firstName: string;
    public lastName: string;
    public userName: string;
    generateUserName() {
        if (this.firstName && this.lastName) {
            this.userName = `${this.firstName.toLowerCase()}_${this.lastName.toLowerCase()}_${Math.floor(Math.random() * 9) + 1}`
        }
    }
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ]),
        FormsModule
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};