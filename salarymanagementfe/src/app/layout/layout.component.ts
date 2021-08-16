
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    constructor( private router: Router) {}
    
    ngOnInit(): void {
        //Mặc định đường dẫn ban đầu sẽ chạy tới http://localhost:4200/informat nha
        this.defaultRouterLoading();
    }
    defaultRouterLoading(){
        this.router.navigateByUrl('boardPayroll');
    }
}
