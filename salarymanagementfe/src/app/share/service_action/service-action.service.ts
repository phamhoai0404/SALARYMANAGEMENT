import { Injectable, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServiceActionService {

    constructor() { }

    public $buttonSidenav = new BehaviorSubject<boolean>(false);

    public setButtonSidenav( is: boolean){
        this.$buttonSidenav.next(is);
    }
    
}
