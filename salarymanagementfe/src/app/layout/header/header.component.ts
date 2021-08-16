import { ServiceHttpService } from './../../share/service_http/service-http.service';
import { ServiceStorageService } from './../../share/service_storage/service-storage.service';
import { ServiceActionService } from './../../share/service_action/service-action.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    
    constructor( 
        private serviceAction: ServiceActionService,
        private serviceStorage: ServiceStorageService,
        private servicehttp: ServiceHttpService
        ) { }

    public number = 0;

    ngOnInit(): void {  
        this.loadData();
        this.subscribeNumberBoardPayroll();
    }
    
    subscribeNumberBoardPayroll(){
        this.serviceStorage.$numberBoardPayroll.subscribe(
            number => this.number = number
        )
    }

    //Lưu trữ vào trong Service Storage dữ liệu của BoardPayroll và số liệu
    loadData(){
        this.servicehttp.getAllBoardPayroll().subscribe(
            data =>{
                this.number = data.length;
                this.serviceStorage.setDataAllBoardPayroll(data);
                this.serviceStorage.setNumberBoardPayroll(data.length);
                // console.log("Storage All Board Payroll - ", this.serviceStorage.$dataAllBoardPayroll );
                // console.log("Storage Number Board Payroll - ", this.serviceStorage.$numberBoardPayroll );
            }
        )
    }
  
    buttonLogout(){}


    //Liên quan đến các hoạt động của trang web 
    openSidernav(){
        console.log("hoa");
        this.serviceAction.setButtonSidenav(true);
    }
}
