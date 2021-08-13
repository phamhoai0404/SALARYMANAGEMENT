import { ServiceHttpService } from './../../share/service_http/service-http.service';
import { ServiceActionService } from './../../share/service_action/service-action.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, AfterViewInit  {

   @ViewChild('sidenav') sidenav: MatSidenav;

    public isOpened = false ;
    constructor(private serviceAction: ServiceActionService) { }

    //Cái này khởi tạo trước 
    ngOnInit(): void {
        console.log("isOpened ", this.isOpened);
    }

    //Không nhầm thì cái này load DOM rồi mới thực hiện
    ngAfterViewInit() {
        this.registerServiceAction();
    }

    registerServiceAction(){
        this.serviceAction.$buttonSidenav.subscribe(
            status =>{
                //Kiểm tra xem buttonSidenav nó đang hoạt động hay không 
                //Nếu đang hoạt động thì thay đổi trạng thái của sidenav
                if(status === true){
                    this.sidenav.toggle();
                }

                this.isOpened = status;
            } 
        )
    }


    public closeLeftSide() {
        this.isOpened = false;
    }

}
