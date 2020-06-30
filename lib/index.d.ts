interface ITimerOptions {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}
declare class Timer {
    private secondMS;
    private minuteMS;
    private hourMS;
    private dayMS;
    private result;
    constructor(options?: ITimerOptions | number | string | Date);
    static static(options: ITimerOptions): number;
    static create(options: ITimerOptions): Timer;
    add(type: string, num: number): Timer;
    addYears(years: number): Timer;
    addMonths(months: number): Timer;
    addWeeks(weeks: number): Timer;
    addDays(days: number): Timer;
    addHours(hours: number): Timer;
    addMinutes(minutes: number): Timer;
    addSeconds(seconds: number): Timer;
    addMilliseconds(milliseconds: number): Timer;
    sub(type: string, num: number): Timer;
    subYears(years: number): Timer;
    subMonths(months: number): Timer;
    subWeeks(weeks: number): Timer;
    subDays(days: number): Timer;
    subHours(hours: number): Timer;
    subMinutes(minutes: number): Timer;
    subSeconds(seconds: number): Timer;
    subMilliseconds(milliseconds: number): Timer;
    setYear(year: number, month?: number, date?: number): Timer;
    setMonth(month: number, date?: number): Timer;
    setDate(date: number): Timer;
    getDay(): number;
    getHours(): number;
    getMinutes(): number;
    getSeconds(): number;
    getTime(): number;
    getDate(): Date;
    getISOString(): string;
    getUTCString(): string;
    format(formatString: string): string;
}
export default Timer;
