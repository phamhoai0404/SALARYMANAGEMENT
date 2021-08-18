import { ExportExcel } from "../model/export-excel.model";
import { Payroll } from "../model/payroll.model";

export class UtilService {
    public static addSalary(data) {
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
    }
    public static addListAllBoardPayroll(dataBoard,listAllPayroll){
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


    private static checkDuration(objectOne, objectTwo){
        if(objectOne.id == objectTwo.id)
            return true;
        return false;
    } 

    public static addDataYear( first: number, last: number){
        let years = [];
        for( let i = first; i <= last; i++){
            years.push(i);
        }
        return years as number[];
    }
    public static addDataMonth(){
        let months = [];
        for( let i = 1; i <=12; i++){
            months.push(i);
        }
        return months as number[];//viết kiểu như này cho hiện rõ thôi
        //có thể viết mỗi như này cũng được
        // return months;
    }
    public static getDataExcel(data: Payroll[]){
        let dataExcel: ExportExcel[];
        let i = 0;
        dataExcel = data.map( record =>{
            let salarys = (record.staff.basicSalary / 26) * record.workDay + record.bonus;
            i +=1;
            return {
                stt: i,
                
                staffId: record.staff.staffId,

                fullName: record.staff.fullName,
               
                position: record.staff.position,
               
                gender: record.staff.gender,
               
                birthday: record.staff.birthday,
               
                basicSalary: record.staff.basicSalary,
               
                workDay: record.workDay,
               
                bonus: record.bonus,
               
                salary: salarys
            }
        })
        return dataExcel;
    }
}