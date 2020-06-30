"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EDateStringPiece;
(function (EDateStringPiece) {
    EDateStringPiece["fullYear"] = "YYYY";
    EDateStringPiece["fullMonth"] = "MM";
    EDateStringPiece["fullDay"] = "DD";
    EDateStringPiece["fullHour"] = "HH";
    EDateStringPiece["fullMinute"] = "mm";
    EDateStringPiece["fullSecond"] = "ss";
    EDateStringPiece["fullMilliSecond"] = "SS";
    EDateStringPiece["fullMilliSecondWithTimezone"] = "SSS";
    EDateStringPiece["halfMonth"] = "M";
    EDateStringPiece["halfDay"] = "D";
    EDateStringPiece["halfHour"] = "hh";
    EDateStringPiece["halfMinute"] = "m";
    EDateStringPiece["halfSecond"] = "s";
    EDateStringPiece["halfWordMonth"] = "MMM";
    EDateStringPiece["fullWordMonth"] = "MMMM";
    EDateStringPiece["wordDay"] = "DDD";
    EDateStringPiece["ordinalDay"] = "dd";
    EDateStringPiece["ampm"] = "A";
})(EDateStringPiece || (EDateStringPiece = {}));
var Formatter = /** @class */ (function () {
    function Formatter(date, format) {
        if (typeof date === 'string') {
            this.date = new Date(date);
        }
        else {
            this.date = date;
        }
        this.formatString = format;
        this.year = this.date.getUTCFullYear();
        this.month = this.date.getUTCMonth();
        this.day = this.date.getUTCDate();
        this.hour = this.date.getUTCHours();
        this.minute = this.date.getUTCMinutes();
        this.second = this.date.getSeconds();
        this.millisecond = this.date.getMilliseconds();
        this.days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        this.months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
    }
    Formatter.prototype.format = function (formatString) {
        var _this = this;
        var formattingTokensRegExp = new RegExp(/[yYQqMLwIdDecihHKkmsaA]o|(\w)\1*|''|'(''|[^'])+('|$)|./g); // This RegExp catches symbols escaped by quotes, and also
        var toFormatString = formatString || this.formatString;
        var result = '';
        toFormatString.match(formattingTokensRegExp).forEach(function (value) {
            result += Formatter.getFormatForPiece(_this, value);
        });
        return result;
    };
    Formatter.format = function (date, formatString) {
        var formatter = new Formatter(date, formatString);
        return formatter.format();
    };
    Formatter.getFormatForPiece = function (formatter, piece) {
        switch (piece) {
            case EDateStringPiece.fullYear:
                return formatter.year.toString();
            case EDateStringPiece.fullMonth:
                return Formatter.prependZero(formatter.month + 1);
            case EDateStringPiece.fullDay:
                return Formatter.prependZero(formatter.day);
            case EDateStringPiece.fullHour:
                return Formatter.prependZero(formatter.hour);
            case EDateStringPiece.fullMinute:
                return Formatter.prependZero(formatter.minute);
            case EDateStringPiece.fullSecond:
                return Formatter.prependZero(formatter.second);
            case EDateStringPiece.fullMilliSecond:
                return Formatter.prependZero(formatter.millisecond);
            case EDateStringPiece.fullMilliSecondWithTimezone:
                return Formatter.prependZeroMilli(formatter.millisecond) + 'Z';
            case EDateStringPiece.halfMonth:
                return (formatter.month + 1).toString();
            case EDateStringPiece.halfDay:
                return formatter.day.toString();
            case EDateStringPiece.halfHour:
                return Formatter.prependZero(formatter.hour > 12 ? formatter.hour - 12 : formatter.hour);
            case EDateStringPiece.halfMinute:
                return formatter.minute.toString();
            case EDateStringPiece.halfSecond:
                return formatter.second.toString();
            case EDateStringPiece.fullWordMonth:
                return formatter.months[formatter.month];
            case EDateStringPiece.halfWordMonth:
                return formatter.months[formatter.month].substr(3);
            case EDateStringPiece.wordDay:
                return formatter.days[formatter.date.getUTCDay()];
            case EDateStringPiece.ampm:
                return formatter.hour > 12 ? 'PM' : 'AM';
            case EDateStringPiece.ordinalDay:
                return Formatter.getOrdinal(formatter.day);
            default:
                return piece;
        }
    };
    Formatter.getOrdinal = function (num) {
        return (num +
            (num > 0
                ? ['th', 'st', 'nd', 'rd'][(num > 3 && num < 21) || num % 10 > 3 ? 0 : num % 10]
                : ''));
    };
    Formatter.prependZero = function (num) {
        if (num < 10) {
            return '0' + num;
        }
        else {
            return num.toString();
        }
    };
    Formatter.prependZeroMilli = function (num) {
        if (num < 100) {
            return '0' + num;
        }
        else {
            return num.toString();
        }
    };
    return Formatter;
}());
exports.default = Formatter;
