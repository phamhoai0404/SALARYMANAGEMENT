import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Staff } from 'src/app/share/model/staff.model';
import { ServiceHttpService } from 'src/app/share/service_http/service-http.service';
import { ServiceStorageService } from 'src/app/share/service_storage/service-storage.service';
import { UtilService } from 'src/app/share/util/util.service';



@Component({
    selector: 'app-delete-record',
    templateUrl: './delete-record.component.html',
    styleUrls: ['./delete-record.component.scss']
})
export class DeleteRecordComponent implements OnInit {

    public staff = new Staff();
    
    constructor(
        private serviceStorage: ServiceStorageService,
        private servicehttp: ServiceHttpService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.loadData();
    }
    buttonDeleteRecord() {
       this.deleteRecord();
    }
    loadData(){
        this.staff = this.serviceStorage.record.staff;
    }
    deleteRecord(){
        this.servicehttp.deleteOneRecordPayroll(this.serviceStorage.record).subscribe(
            () => {
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
