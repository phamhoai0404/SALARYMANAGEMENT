import { ServiceHttpService } from './../../../share/service_http/service-http.service';
import { ServiceStorageService } from './../../../share/service_storage/service-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Staff } from 'src/app/share/model/staff.model';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from 'src/app/share/util/util.service';


@Component({
    selector: 'app-edit-record',
    templateUrl: './edit-record.component.html',
    styleUrls: ['./edit-record.component.scss']
})
export class EditRecordComponent implements OnInit {


    public staff = new Staff();
    public recordGroup = new FormGroup({
        workDay: new FormControl(''),
        bonus: new FormControl(''),
    })
    constructor(
        private serviceStorage: ServiceStorageService,
        private servicehttp: ServiceHttpService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.loadData();
    }

    buttonEdit() {
        console.log("Kích vào");
        this.editData();
    }
    loadData() {
        console.log('Dữ liệu một bản ghi - ', this.serviceStorage.record);

        //Truyền dữ liệu từ store staff vào staff
        this.staff = this.serviceStorage.record.staff;

        //Truyền dữ liệu vào ngày công, tiền thưởng
        this.recordGroup.controls.workDay.setValue(this.serviceStorage.record['workDay']);
        this.recordGroup.controls.bonus.setValue(this.serviceStorage.record['bonus']);
    }

    /**
     * @returns bảng ghi cần sửa ( chỉ có workDay, bonus thôi)
     */
    getData() {
        for (const controlName in this.recordGroup.controls) {
            //Kiểu nếu nó tồn tại ấy 
            if (controlName) {
                this.serviceStorage.record[controlName] = this.recordGroup.controls[controlName].value;
            }
        }
        // console.log(this.serviceStorage.record);h
        return this.serviceStorage.record;
    }
    /**
     * Kiểu put dữ liệu lên trước rồi mới tiếp tục thực hiện 
     *  -> Lấy lại dữ liệu của bảng payroll 
     * (vì bảng payroll không có tổng lương thì phải set thêm tổng lương),
     * 
     * rồi tiếp tục set lại dữ liệu của tất cả các bảng ( 
     *  nếu bình thường chỉ cần set lại dữ liệu của bảng payroll đấy thôi , mặc dù hơi thừa nhưng không biết cách làm khác)
     */
    editData() {

        //Đầu tiên cần phải check dữ liệu trước đã
        //Nhưng hiện tại chưa cần

        //edit data 
        this.servicehttp.editOneRecordPayroll(this.getData()).subscribe(
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


}
