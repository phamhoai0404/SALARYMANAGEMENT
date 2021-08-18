import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Duration } from 'src/app/share/model/duration.model';
import { Payroll } from 'src/app/share/model/payroll.model';
import { Staff } from 'src/app/share/model/staff.model';
import { ServiceHttpService } from 'src/app/share/service_http/service-http.service';
import { ServiceStorageService } from 'src/app/share/service_storage/service-storage.service';
import { UtilService } from 'src/app/share/util/util.service';

interface Animal {
    name: string;
    sound: string;
}

@Component({
    selector: 'app-add-record',
    templateUrl: './add-record.component.html',
    styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {

    public duration: Duration;
    public recordGroup = new FormGroup({
        workDay: new FormControl(''),
        bonus: new FormControl(''),
    });
    public staffAll: Staff[];
    public staffControl = new FormControl('', Validators.required);

    constructor(
        private serviceStorage: ServiceStorageService,
        private servicehttp: ServiceHttpService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.loadStaff();
    }
    buttonAdd(staff: any) {
        // console.log("getData", this.getData(staff));
        if(this.getData(staff)){
            this.addPayroll();
        }
    }

    loadStaff() {
        this.duration = this.serviceStorage.durationPoint;
        this.servicehttp.getStaffNotExistsDuration(this.duration.id).subscribe(
            data => {
                // console.error("load staff" , data);
                this.staffAll = data;

            }
        )
    }
    addPayroll() {
        //Cần phải check dữ liệu trước nhưng mà thôi h chưa cần nhá

        //this.serviceStorage.record cái này lúc này đã lấy được rồi
        this.servicehttp.addPayroll(this.serviceStorage.record).subscribe(
            () =>{
                this.servicehttp.getAllPayroll().subscribe(
                    data2222 => {
                        this.serviceStorage.setDataAllPayroll(UtilService.addSalary(data2222));
                        this.serviceStorage.setlistAllBoardPayroll(
                            UtilService.addListAllBoardPayroll(this.serviceStorage.dataAllBoardPayroll, this.serviceStorage.dataAllPayroll )
                        );
                        this.dialog.closeAll();
                    }
                )
            }
        )

    }
    /**
     * Cần phải check dữ liệu trước nhưng h thì chưa cần 
     * @param staff 
     * @returns 
     */
    getData(staff ) {
        if (staff) {
            this.serviceStorage.record = new Payroll();
            this.serviceStorage.record.staff =  staff;
            this.serviceStorage.record.duration = this.duration ;
            

            //Vì phần này toàn là số nên nếu không tồn tại thì cho bằng 0
            for (const controlName in this.recordGroup.controls) {
                if (controlName) {//Nếu tồn tại
                    this.serviceStorage.record[controlName] = this.recordGroup.controls[controlName].value;
                } else {//Nếu không tồn tại
                    this.serviceStorage.record[controlName] = 0;
                }
            }
            return true;
            // return this.serviceStorage.record;//Nếu tồn tại được chọn rồi thì trả về bản ghi để chuẩn bị post lên data
        }
        return false;//Nếu mà staff chưa được chọn thì trả về flase
    }

}
