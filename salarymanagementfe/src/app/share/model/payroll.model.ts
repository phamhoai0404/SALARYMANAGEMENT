import { Duration } from './duration.model';
import { Staff } from "./staff.model";

export class Payroll {
    constructor(
        id?: number,

        public staff?: Staff,

        public duration?: Duration,

        public workDay?: number,

        public bonus?: number,

        public salary?: number
    ) { }
}