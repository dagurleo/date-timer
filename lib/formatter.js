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
    EDateStringPiece["halfHour"] = "hh";
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
        this.format = format;
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
    Formatter.prototype.execute = function () {
        var _this = this;
        var formattingTokensRegExp = new RegExp(/[yYQqMLwIdDecihHKkmsaA]o|(\w)\1*|''|'(''|[^'])+('|$)|./g); // This RegExp catches symbols escaped by quotes, and also
        var result = '';
        var pieces = this.format
            .match(formattingTokensRegExp)
            .map(function (value) {
            result += _this.getFormatForPiece(value);
        });
        return result;
        // console.log(this)
    };
    Formatter.prototype.getFormatForPiece = function (piece) {
        switch (piece) {
            case EDateStringPiece.fullYear:
                return this.year.toString();
            case EDateStringPiece.fullMonth:
                return this.prependZero(this.month + 1);
            case EDateStringPiece.fullDay:
                return this.prependZero(this.day);
            case EDateStringPiece.fullHour:
                return this.prependZero(this.hour);
            case EDateStringPiece.fullMinute:
                return this.prependZero(this.minute);
            case EDateStringPiece.fullSecond:
                return this.prependZero(this.second);
            case EDateStringPiece.fullMilliSecond:
                return this.prependZero(this.millisecond);
            case EDateStringPiece.fullMilliSecondWithTimezone:
                return this.prependZeroMilli(this.millisecond) + 'Z';
            case EDateStringPiece.halfHour:
                return this.prependZero(this.hour > 12 ? this.hour - 12 : this.hour);
            case EDateStringPiece.ampm:
                return this.hour > 12 ? 'PM' : 'AM';
            default:
                return piece;
        }
    };
    Formatter.prototype.prependZero = function (num) {
        if (num < 10) {
            return '0' + num;
        }
        else {
            return num.toString();
        }
    };
    Formatter.prototype.prependZeroMilli = function (num) {
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
