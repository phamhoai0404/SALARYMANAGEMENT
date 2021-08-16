import { Staff } from './../../share/model/staff.model';
import { Duration } from './../../share/model/duration.model';
import { LayoutComponent } from './../../layout/layout.component';
import { ServiceStorageService } from './../../share/service_storage/service-storage.service';
import { ServiceHttpService } from './../../share/service_http/service-http.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Payroll } from 'src/app/share/model/payroll.model';
 


@Component({
    selector: 'app-board-payroll',
    templateUrl: './board-payroll.component.html',
    styleUrls: ['./board-payroll.component.scss']
})
export class BoardPayrollComponent implements OnInit, AfterViewInit {

    constructor(
        private serviceStorage: ServiceStorageService,
        private servicehttp: ServiceHttpService
    ) { }

    public dataBoardPayroll = Duration[0];
    public listAllPayroll: Payroll[];
    public listAllBoardPayroll: Array<Payroll[]>;

    ngOnInit(): void {
        this.subscribeNumberBoardPayroll();
        this.subscribeDataAllPayroll();
        this.subscribeListAllBoardPayroll();
        this.loadDataPayroll();
    }
    ngAfterViewInit() {

    }
    subscribeNumberBoardPayroll() {
        this.serviceStorage.$dataAllBoardPayroll.subscribe(
            data => {
                this.dataBoardPayroll = data;
            }
        )
    }
    subscribeDataAllPayroll() {
        this.serviceStorage.$dataAllPayroll.subscribe(
            data => {
                this.listAllPayroll = data;
            }
        )
    }
    
    subscribeListAllBoardPayroll(){
        this.serviceStorage.$listAllBoardPayroll.subscribe(
            listBoardPayroll =>{
                this.listAllBoardPayroll = listBoardPayroll;
            }
        )
    }

    loadDataPayroll() {
        this.servicehttp.getAllPayroll().subscribe(
            data => {
                this.serviceStorage.setDataAllPayroll(this.addSalary(data));
                console.log("this.listAllPayroll", this.listAllPayroll);
                this.serviceStorage.setlistAllBoardPayroll(
                    this.addListAllBoardPayroll(this.dataBoardPayroll,this.listAllPayroll)
                );
                console.error(" do nha", this.listAllBoardPayroll);
                    
            }
        )
    }
    addSalary(data) {
        let dataAll = data.map(record => {
            let salary = (record.staff.basicSalary / 26) * record.workDay + record.bonus;
            return {
                id: record.id,
                staff: record.staff,
                duration: record.duration,
                workDay: record.workDay,
                bonus: record.bonus,
                salary: salary
            }
        })
        return dataAll;
    };
    addListAllBoardPayroll(dataBoard,listAllPayroll){
        console.log("dataBoard", dataBoard);
        console.log("listAllPayroll", listAllPayroll);

        let listAllBoardPayroll = new Array<Payroll[]>();
        for( let i = 0; i < dataBoard.length; i++){
            let temp = [];//chú ý chỗ này nha
            for( let j = 0 ; j < listAllPayroll.length ; j++){
                if( this.checkDuration( listAllPayroll[j].duration, dataBoard[i])){
                    temp.push(listAllPayroll[j] as Payroll);
                }
            }
            listAllBoardPayroll.push(temp);
        }
        return listAllBoardPayroll;
    }


    checkDuration(objectOne, objectTwo){
        if(objectOne.id == objectTwo.id)
            return true;
        return false;
    } 
    check(){
        if( this.dataBoardPayroll == null || this.dataBoardPayroll.length ==0)
            return false;
        return true;
    }
    checkTwo(){
        if(this.listAllBoardPayroll == null || this.listAllBoardPayroll.length ==0)
            return false;
        return true;
    }
    tongluong(oneBoardPayroll){
        if(oneBoardPayroll == null || oneBoardPayroll.length == 0)
            return 0;
        return oneBoardPayroll.reduce((tong, doituong) => tong + doituong.salary, 0);
    }
    
}

