declare class Formatter {
    private date;
    private formatString;
    private year;
    private month;
    private day;
    private hour;
    private minute;
    private second;
    private millisecond;
    private days;
    private months;
    constructor(date: Date | string, format: string);
    format(formatString?: string): string;
    static format(date: Date, formatString: string): string;
    static getFormatForPiece(formatter: Formatter, piece: string): string;
    static getOrdinal(num: number): string;
    static prependZero(num: number): string;
    static prependZeroMilli(num: number): string;
}
export default Formatter;
