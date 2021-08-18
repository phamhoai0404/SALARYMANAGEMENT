import { ExportExcelStyleService } from './export-excel-style.service';
import { Injectable } from '@angular/core';
import * as Excel from 'exceljs/dist/exceljs.min.js'
import * as FileSave from 'file-saver'

@Injectable({
    providedIn: 'root'
})
export class ExportExcelService {

    constructor( private Style: ExportExcelStyleService) { }
    
    async exportToExcelPro({
        myData,
        fileName,
        sheetName,
        report,
        myHeader,
        myFooter,
        widths
    }) {
        if (!myData || myData.length === 0) {
            // console.error("export-excel - chưa có dữ liệu");
            return;
        }
        // console.error("export data - có dữ liệu", myData);
        const wb = new Excel.Workbook();
        const ws = wb.addWorksheet(sheetName);

        const columns = myHeader?.length;

        if (widths && widths.length > 0) {
            ws.columns = widths;
        }

        //Dùng để cách dòng
        ws.addRow(null);

        let row = this.addRow(ws, [report], this.Style.title);
        this.mergeCell(ws, row, 1, columns);

        //Cái này dùng để cách dòng
        ws.addRow(null);
        ws.addRow(null);



        this.addRow(ws, myHeader, this.Style.header);

        //Thêm dữ liệu cho từng dòng một ở data
        myData.forEach(rowsss => {
            // console.log("vào ForE");
            this.addRow(ws, Object.values(rowsss), this.Style.data);
        });

        row = this.addRow(ws, myFooter, this.Style.footer);
        this.mergeCell(ws, row, 1, columns - 1);

        const buf = await wb.xlsx.writeBuffer();
        FileSave.saveAs(new Blob([buf]), `${fileName}.xlsx`);

    };

    
    private addRow(ws, data, section) {

        const row = ws.addRow(data);

        // console.error("Trong addRow nha: ", data, section);
        // console.error("trước row", row);

        row.eachCell({ includeEmpty: true }, (cell) => {
            // console.error("trong row eachCell");
            if (section?.border) {
                cell.border = this.Style.borderStyle;
            }
            if(section?.money && typeof cell.value === 'number'){
                cell.alignment = { horizontal: 'center', vertical: 'middle'},
                cell.numFmt = '#,##0';
            }
            if (section?.alignment) {
                cell.alignment = section.alignment;
            } else {
                cell.alignment = { vertical: 'middle' };
            }
            if (section?.font) {
                cell.font = section.font;
            }
            if (section?.fill) {
                cell.fill = section.fill;
            }
        });

        if (section?.height > 0) {
            row.height = section.height;
        }
        return row;
    }

    private mergeCell(ws, row, from, to) {
        ws.mergeCells(`${row.getCell(from)._address}:${row.getCell(to)._address}`);
    }
}
