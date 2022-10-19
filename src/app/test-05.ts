/**
 * Fix the following issues in the component :
 * * ExpressionChangedAfterItHasBeenCheckedError
 * * Spot the memory leak
 * 
 */
import { Component, NgModule, Injectable, Input, ChangeDetectorRef  } from '@angular/core';
import { RouterModule, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

// SOLUTION 1: When MainComponent ngOnInit hook has subscribed to the Subject, some value in the Subject was already present so subscription callback is called immediately
// and MainComponent view is updated, but after that ChildComponent ngAfterViewInit again updates the Subject so subscription callback is called once again, as value of MainComponent 
// property is now changed again, so we have to render custom change detection this time to let angular know about the change. This will be done in ngAfterContentChecked hook in MainComponent

// SOLUTION 2: Angular change detection works in a tree structure, so parent change detection runs before and their view is rendered before, so after parent view is rendered child 
// should not update the parent. thats a bad practice

// SOLUTION 3: if child has to update the parent, then it should be done async so that it will be picked up in next change detection i.e setTimeout, immediately resolving Promise

// MEMORY LEAK: we have to unsubscribe all the infinite subscriptions before the component is being destroyed by angular otherwise it will cause a memory leak

@Injectable()
export class TestService {
    test:BehaviorSubject<string>;
    constructor() {
        this.test  = new BehaviorSubject("angular test #5");
    }
    SetTest(test:string) {
        console.log('in test service setTest function');        
        this.test.next(test);
    }
}

@Component({
    selector : 'ng-app',
    template : `
                <h2>Current test is:</h2>
                {{test}}
                <br/>
                <child [skip-current]="true"></child>
                `,
    styles : []
})
export class MainComponent {
    test:string = null;
    sub;
    constructor(private _srv:TestService, private cdref: ChangeDetectorRef) {
        console.log('in maincomponent constructor');        
    }
    ngOnInit() {
        console.log('in main comp ngoninit');
        this.sub = this._srv.test.subscribe(test=>{
            console.log('subscribe callback called');
            this.test = test;
        });
    }
    // ngAfterContentChecked() {
    //     this.cdref.detectChanges();
    // }
    ngOnDestroy() {
        console.log('main component destroy');
        this.sub.unsubscribe();
    }
}

@Component({
    selector : 'child',
    template : `Sample Child component<br/> <button (click)="Next()">next test</button>`    
})
export class TextChildComponent {
    @Input('skip-current') skip = false;
    constructor(private _srv:TestService, private _router:Router) {
        console.log('in child comp constructor::skip', this.skip);
    }
    Next() {
        console.log('in child comp Next fun');
        this._router.navigate(["test-six"]);
    }
    ngAfterViewInit() {
        console.log('in child comp ngAfterViewInit::skip', this.skip);        
        if(this.skip) {
            setTimeout(() => {
                this._srv.SetTest("angular test #6")
            }, 0);
            // this._srv.SetTest("angular test #6")
        };
    }
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : MainComponent
            }
        ])
    ],
    declarations : [MainComponent,TextChildComponent],
    providers : [TestService]
})
export class MainModule {};