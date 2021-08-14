import { Duration } from './../model/duration.model';
import { BehaviorSubject } from 'rxjs';
import { ServiceHttpService } from './../service_http/service-http.service';
import { Injectable } from '@angular/core';
import { Payroll } from '../model/payroll.model';

@Injectable({
    providedIn: 'root'
})
export class ServiceStorageService {
    constructor(private servicehttp: ServiceHttpService) { }

    public $dataAllPayroll = new BehaviorSubject<Payroll[]>(null);
    public $numberBoardPayroll = new BehaviorSubject<number>(0);
    public $dataAllBoardPayroll = new BehaviorSubject<Duration[]>(null);

    public setDataAllPayroll( data){
        this.$dataAllPayroll.next(data);
    }
    public setNumberBoardPayroll(data){
        this.$numberBoardPayroll.next(data);
    }
    public setDataAllBoardPayroll( data){
        this.$dataAllBoardPayroll.next(data);
    }
 
}
