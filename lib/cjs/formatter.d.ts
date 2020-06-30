declare class Formatter {
    private date;
    private format;
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
    execute(): string;
    private getFormatForPiece;
    private prependZero;
    private prependZeroMilli;
}
export default Formatter;
