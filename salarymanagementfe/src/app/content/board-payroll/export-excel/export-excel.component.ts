import { UtilService } from './../../../share/util/util.service';
import { Duration } from 'src/app/share/model/duration.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ServiceHttpService } from 'src/app/share/service_http/service-http.service';
import { ServiceStorageService } from 'src/app/share/service_storage/service-storage.service';
import { ExportExcelService } from 'src/app/share/excel/export-excel.service';
import { ExportExcel } from 'src/app/share/model/export-excel.model';

@Component({
    selector: 'app-export-excel',
    templateUrl: './export-excel.component.html',
    styleUrls: ['./export-excel.component.scss']
})
export class ExportExcelComponent implements OnInit {

    public boardControl = new FormControl('', Validators.required);
    public allBoard: Duration[];
   
    public dataExcel: ExportExcel[];

    constructor(
        private serviceStorage: ServiceStorageService,
        private servicehttp: ServiceHttpService,
        private dialog: MatDialog,
        private ExportExcel: ExportExcelService
    ) { }

    ngOnInit(): void {
        this.loadDuration();
        // console.log("this.loadDuration", this.allBoard);
    }
    buttonExport(board){

        //Check lựa chọn đấy
        if(board == ""){
            alert(" Bạn phải chọn bảng lương để tải về !!!");
            return ;
        }
        if( !board) return;

        this.exportExcel( board);
        
       
        
    }
    loadDuration(){
        this.allBoard = this.serviceStorage.dataAllBoardPayroll;
    }
    
   

    
    exportExcel(duration){
        //Lấy dữ liệu payroll theo id của duration 
        this.servicehttp.getPayrollByDuration(duration).subscribe(
            data =>{
                if(data.length == 0){
                    alert("Không có bản ghi nào mà trích xuất");
                }else{

                    //Chuyển dữ liệu từ Payroll về dữ liệu Excel để export
                    this.dataExcel = UtilService.getDataExcel(data);

                    // console.log("this.dataExcel", this.dataExcel);

                    //Thực hiện export ra excel
                    this.executeExport(this.dataExcel,duration);
                    
                    //Sau khi tải về xong thì đóng dialog lại 
                    this.dialog.closeAll();
                }
            }
        )
    }
    

    executeExport(data,duration) {

        let fname = duration.month + '-' + duration.year;
        let sum = data.reduce((salary, record) => salary + record.salary, 0);
        // console.error("Đã click vào button export excel");
        this.ExportExcel.exportToExcelPro({
            myData: data,
            fileName: 'Bảng lương tháng '  + fname,
            sheetName: fname,
            report: "Bảng lương tháng " + fname,
            myHeader: ['Stt ', 'Mã nhân viên', 'Tên nhân viên', 'Vị trí', 'Giới tính', 'Ngày sinh', 'Lương cơ bản', 'Ngày làm việc', 'Tiền Thưởng', 'Lương'],
            myFooter: ['Tổng tiền lương', '', '','','', '','','', '',sum],
            widths: [
                { width: 5 },
                { width: 10 },
                { width:  25 },
                { width: 20 },
                { width: 15 },
                { width: 15 },
                { width: 30 },
                { width: 10 },
                { width: 20 },
                { width: 30 }
            ]
        });

    }
    

}
