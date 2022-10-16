/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, EventEmitter, NgModule, Output  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'textfield',
    template : '<input type="text" value="" [(ngModel)]="field" (change)="fieldChanged($event)"/>'
})
export class TextField {
    @Output() onFieldChange = new EventEmitter<string>();
    field = "";
    fieldChanged(event) {
        this.onFieldChange.emit(event.target.value)
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield (onFieldChange)="fieldReceived($event)"></textfield>`
})
export class ChildComponent {
    @Output() onFieldChange = new EventEmitter<string>();
    fieldReceived(value) {
        this.onFieldChange.emit(value)
        
    }
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (onFieldChange)="fieldReceived($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {
    title:string = "";
    fieldReceived(value) {
        this.title = value;
    }
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ]),
        FormsModule
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};