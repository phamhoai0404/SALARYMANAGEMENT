import { ServiceActionService } from './../../share/service_action/service-action.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    
    constructor( private serviceAction: ServiceActionService) { }

    public number = 0;

    ngOnInit(): void {  
    }

    openSidernav(){
        this.serviceAction.setButtonSidenav(true);
    }

    buttonLogin(){}
}
