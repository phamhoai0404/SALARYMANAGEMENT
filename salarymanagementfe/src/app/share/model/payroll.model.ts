import { Duration } from './duration.model';
import { Staff } from "./staff.model";

export class Payroll {
    constructor(
        id?: number,

        staff?: Staff,

        public duration?: Duration,

        workDay?: number,

        bonus?: number,

        salary?: number
    ) { }
}