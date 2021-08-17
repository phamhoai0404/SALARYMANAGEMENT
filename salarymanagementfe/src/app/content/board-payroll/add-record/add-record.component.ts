import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Duration } from 'src/app/share/model/duration.model';
import { ServiceStorageService } from 'src/app/share/service_storage/service-storage.service';

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
    })
    constructor(
        private serviceStorage: ServiceStorageService,
    ) { }

    ngOnInit(): void {
        this.duration = this.serviceStorage.durationPoint;
    }
    buttonAdd(){
        
    }
    
}
