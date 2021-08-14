import { Staff } from './../../share/model/staff.model';
import { Duration } from './../../share/model/duration.model';
import { LayoutComponent } from './../../layout/layout.component';
import { ServiceStorageService } from './../../share/service_storage/service-storage.service';
import { ServiceHttpService } from './../../share/service_http/service-http.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Payroll } from 'src/app/share/model/payroll.model';
import * as $ from 'jquery' 


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

    public listBoardPayroll: Duration[];
    public listAllPayroll: Payroll[];

    ngOnInit(): void {
        this.subscribeNumberBoardPayroll();
        this.subscribeDataAllPayroll();
        this.loadDataPayroll();
    }
    ngAfterViewInit() {

    }
    subscribeNumberBoardPayroll() {
        this.serviceStorage.$dataAllBoardPayroll.subscribe(
            data => {
                this.listBoardPayroll = data;
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
    loadDataPayroll() {
        this.servicehttp.getAllPayroll().subscribe(
            data => {
                this.serviceStorage.setDataAllPayroll(this.addSalary(data));
                console.log("this.listAllPayroll", this.listAllPayroll);

            }
        )
    }
    addSalary(data) {
        let dataAll = data.map(record => {
            let salary = record.staff.basicSalary / 26 * record.bonus;
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
    checkDuration(objectOne, objectTwo){
        if(objectOne.id == objectTwo.id)
            return true;
        return false;
        
    }
    checkDurationAll(item){
        let listOneBoard = this.checkPayroll(item);
        if(listOneBoard.length >0){
            this.addRecordPayroll(listOneBoard);
        }
    }
    checkPayroll(item){
        let listOneBoardPayroll = [];
        this.listAllPayroll.forEach(
            payroll =>{
                if(this.checkDuration(item, payroll.duration)){
                    listOneBoardPayroll.push(payroll);
                }
            });
        return listOneBoardPayroll;
    }


    addRecordPayroll(listPayroll){
        const area = $("#areaRecordPayroll");
        let temp ="";
        temp +="xinh gái quá";
            temp +="<tr *ngFor=\" let record of 'listPayroll' \" >";
            temp +="<td></td>";
            temp +="<td>{{ record.staff.staffId }}</td>";
            temp +="<td>{{ record.staff.fullName }}</td>";
            temp +="<td>{{ record.staff.gender }}</td>";
            temp +="<td>{{ record.staff.birthday }}</td>";
            temp +="<td>{{ record.staff.position }}</td>";
            temp +="<td>{{ record.staff.basicSalary }}</td>";
            temp +="<td>{{ record.workDay }}</td>";
            temp +="<td>{{ record.bonus }}</td>";
            temp +="<td>{{ record.salary }}</td>";
            temp +="<td>Xóa</td>";
            temp +="<td>Sửa</td>";
            temp +="</tr>";

            area.before(temp);
        console.log(temp);
        
    }
}

