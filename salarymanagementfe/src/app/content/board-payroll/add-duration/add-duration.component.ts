import { MatDialog } from '@angular/material/dialog';
import { Duration } from 'src/app/share/model/duration.model';
import { UtilService } from 'src/app/share/util/util.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ServiceStorageService } from 'src/app/share/service_storage/service-storage.service';
import { ServiceHttpService } from 'src/app/share/service_http/service-http.service';


@Component({
    selector: 'app-add-duration',
    templateUrl: './add-duration.component.html',
    styleUrls: ['./add-duration.component.scss']
})
export class AddDurationComponent implements OnInit {

    public monthControl = new FormControl('', Validators.required);
    public yearControl = new FormControl('', Validators.required);

    public months: number[] = [];
    public years: number[] = [];



    constructor(
        private serviceStorage: ServiceStorageService,
        private servicehttp: ServiceHttpService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.addDataMonthAndYear(2010, 2050);
    }

    buttonAdd(month, year) {
        console.log(month, year);
        if (month == "" || year == "") {
            alert("Bạn phải chọn tháng và năm");
            return;
        }
        if (month && year) {
            // console.log("month, year", month, year);
            // console.log( this.getDuration(month, year));
            this.addDuration(month, year);
        }
    }
    //Thêm dữ liệu cho ngày và năm 
    addDataMonthAndYear(first, last) {
        this.months = UtilService.addDataMonth();
        this.years = UtilService.addDataYear(first, last);
    }
    getDuration(month, year) {
        let duration = new Duration();
        duration.month = month;
        duration.year = year;
        return duration;
    }
    
    addDuration(month, year){
        this.servicehttp.addDuration(this.getDuration(month,year)).subscribe(
            ()=>{
                this.servicehttp.getAllBoardPayroll().subscribe(
                    data2222 => {
                        this.serviceStorage.setNumberBoardPayroll(data2222.length);
                        this.serviceStorage.setDataAllBoardPayroll(data2222);
                        this.dialog.closeAll();
                    }
                )
            },
            () =>{
                alert("Bảng lương này đã tồn tại trong cơ sở dữ liệu");
                return;
            }
        )
    }






}
