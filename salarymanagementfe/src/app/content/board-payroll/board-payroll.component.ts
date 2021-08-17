import { AddRecordComponent } from './add-record/add-record.component';
import { UtilService } from './../../share/util/util.service';
import { Duration } from './../../share/model/duration.model';
import { ServiceStorageService } from './../../share/service_storage/service-storage.service';
import { ServiceHttpService } from './../../share/service_http/service-http.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Payroll } from 'src/app/share/model/payroll.model';
import { MatDialog } from '@angular/material/dialog';
import { EditRecordComponent } from './edit-record/edit-record.component';
import { DeleteRecordComponent } from './delete-record/delete-record.component';
 


@Component({
    selector: 'app-board-payroll',
    templateUrl: './board-payroll.component.html',
    styleUrls: ['./board-payroll.component.scss']
})
export class BoardPayrollComponent implements OnInit, AfterViewInit {

    constructor(
        private serviceStorage: ServiceStorageService,
        private servicehttp: ServiceHttpService,
        private dialog: MatDialog
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
                this.serviceStorage.setDataAllPayroll(UtilService.addSalary(data));
                console.log("this.listAllPayroll", this.listAllPayroll);
                this.serviceStorage.setlistAllBoardPayroll(
                    UtilService.addListAllBoardPayroll(this.dataBoardPayroll,this.listAllPayroll)
                );
                console.error(" do nha", this.listAllBoardPayroll);
                    
            }
        )
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
    

    //Các hoạt động thêm sửa xóa
    buttonEdit(record){
        // console.log("Đã kích vào Edit");
        this.openDialog(EditRecordComponent, record);

    }
    buttonDelete(record){
        this.openDialog(DeleteRecordComponent, record);
    }
    buttonAdd(item){
        console.log("kích vào add", item);
        this.serviceStorage.durationPoint = item;
        this.dialog.open(AddRecordComponent);
    }
    openDialog(component, data){
        this.dialog.open(component);
        this.serviceStorage.record = data;
    }
}

