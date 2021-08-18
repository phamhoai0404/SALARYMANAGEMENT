import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExportExcelStyleService {

    constructor() { }
    public title = {
        border: true,
        money: false,
        height: 40,
        font: { size: 30, bold: false, color: { argb: 'FFFFFF' } },
        alignment: { horizontal: 'center', vertical: 'middle' },
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
                argb: '15FF00'
            }
        }
    };
    public data = {
        border: true,
        money: true,
        height: 0,
        font: { size: 12, bold: false, color: { argb: '000000' } },
        alignment: null,
        fill: null
    };
    public header = {
        border: true,
        money: false,
        height: 70,
        font: { size: 15, bold: false, color: { argb: 'FFFFFF' } },
        alignment: { horizontal: 'center', vertical: 'middle' },
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
                argb: '16B63E'
            }
        }
    };
    public footer = {
        border: true,
        money: true,
        height: 30,
        font: { size: 15, bold: true, color: { argb: 'FFFFFF' } },
        alignment: null,
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
                argb: '16B63E'
            }
        }
    };
    public borderStyle = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
    };
}
