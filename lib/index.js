"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var formatter_1 = __importDefault(require("./formatter"));
var EAddType;
(function (EAddType) {
    EAddType["years"] = "years";
    EAddType["months"] = "months";
    EAddType["weeks"] = "weeks";
    EAddType["days"] = "days";
    EAddType["hours"] = "hours";
    EAddType["minutes"] = "minutes";
    EAddType["seconds"] = "seconds";
    EAddType["milliseconds"] = "milliseconds";
})(EAddType || (EAddType = {}));
var Timer = /** @class */ (function () {
    function Timer(options) {
        this.secondMS = 1000;
        this.minuteMS = this.secondMS * 60;
        this.hourMS = this.minuteMS * 60;
        this.dayMS = this.hourMS * 24;
        if (options) {
            if (typeof options === 'number') {
                this.result = new Date(options);
            }
            else if (typeof options === 'string') {
            }
            else if (options instanceof Date) {
                this.result = options;
            }
            else {
                var result = new Date().getTime();
                var secondMS = 1000;
                var minuteMS = secondMS * 60;
                var hourMS = minuteMS * 60;
                var dayMS = hourMS * 24;
                checkTypes(options);
                result += options.days ? options.days * dayMS : 0;
                result += options.hours ? options.hours * hourMS : 0;
                result += options.minutes ? options.minutes * minuteMS : 0;
                result += options.seconds ? options.seconds * secondMS : 0;
                result += options.milliseconds ? options.milliseconds : 0;
                this.result = new Date(result);
            }
        }
        else {
            this.result = new Date();
        }
    }
    Timer.static = function (options) {
        var result = new Date().getTime();
        var secondMS = 1000;
        var minuteMS = secondMS * 60;
        var hourMS = minuteMS * 60;
        var dayMS = hourMS * 24;
        checkTypes(options);
        result += options.days ? options.days * dayMS : 0;
        result += options.hours ? options.hours * hourMS : 0;
        result += options.minutes ? options.minutes * minuteMS : 0;
        result += options.seconds ? options.seconds * secondMS : 0;
        result += options.milliseconds ? options.milliseconds : 0;
        return result;
    };
    Timer.create = function (options) {
        var result = new Date().getTime();
        var secondMS = 1000;
        var minuteMS = secondMS * 60;
        var hourMS = minuteMS * 60;
        var dayMS = hourMS * 24;
        checkTypes(options);
        result += options.days ? options.days * dayMS : 0;
        result += options.hours ? options.hours * hourMS : 0;
        result += options.minutes ? options.minutes * minuteMS : 0;
        result += options.seconds ? options.seconds * secondMS : 0;
        result += options.milliseconds ? options.milliseconds : 0;
        return new Timer(result);
    };
    // Add time values to current timer
    Timer.prototype.add = function (type, num) {
        switch (type) {
            case EAddType.years:
                return this.addYears(num);
            case EAddType.months:
                return this.addMonths(num);
            case EAddType.weeks:
                return this.addWeeks(num);
            case EAddType.days:
                return this.addDays(num);
            case EAddType.hours:
                return this.addHours(num);
            case EAddType.minutes:
                return this.addMinutes(num);
            case EAddType.seconds:
                return this.addSeconds(num);
            case EAddType.milliseconds:
                return this.addMilliseconds(num);
            default:
                return this;
        }
    };
    Timer.prototype.addYears = function (years) {
        years = ensureNumber(years);
        if (years) {
            var desiredYear = this.result.getFullYear() + years;
            this.result.setFullYear(desiredYear);
        }
        return this;
    };
    Timer.prototype.addMonths = function (months) {
        months = ensureNumber(months);
        if (months) {
            var result = new Date(this.result.toISOString());
            var desiredMonth = this.result.getMonth() + months;
            result.setFullYear(this.result.getFullYear(), desiredMonth, 1);
            var daysInMonth = getDaysInMonth(result);
            this.result.setMonth(desiredMonth, Math.min(daysInMonth, this.result.getDate()));
        }
        return this;
    };
    Timer.prototype.addWeeks = function (weeks) {
        weeks = ensureNumber(weeks);
        if (weeks) {
            this.result = new Date(this.result.getTime() + 7 * weeks * this.dayMS);
        }
        return this;
    };
    Timer.prototype.addDays = function (days) {
        days = ensureNumber(days);
        if (days && typeof days === 'number') {
            this.result.setDate(this.result.getDate() + days);
        }
        return this;
    };
    Timer.prototype.addHours = function (hours) {
        hours = ensureNumber(hours);
        if (hours) {
            this.result = new Date(this.result.getTime() + hours * this.hourMS);
        }
        return this;
    };
    Timer.prototype.addMinutes = function (minutes) {
        minutes = ensureNumber(minutes);
        if (minutes) {
            this.result = new Date(this.result.getTime() + minutes * this.minuteMS);
        }
        return this;
    };
    Timer.prototype.addSeconds = function (seconds) {
        seconds = ensureNumber(seconds);
        if (seconds) {
            this.result = new Date(this.result.getTime() + seconds * this.secondMS);
        }
        return this;
    };
    Timer.prototype.addMilliseconds = function (milliseconds) {
        milliseconds = ensureNumber(milliseconds);
        if (milliseconds) {
            this.result = new Date(this.result.getTime() + milliseconds);
        }
        return this;
    };
    // Sub time values from current timer
    Timer.prototype.sub = function (type, num) {
        switch (type) {
            case EAddType.weeks:
                return this.subWeeks(num);
            case EAddType.days:
                return this.subDays(num);
            case EAddType.hours:
                return this.subHours(num);
            case EAddType.minutes:
                return this.subMinutes(num);
            case EAddType.seconds:
                return this.subSeconds(num);
            case EAddType.milliseconds:
                return this.subMilliseconds(num);
            default:
                return this;
        }
    };
    Timer.prototype.subYears = function (years) {
        if (years) {
            return this.addYears(-years);
        }
    };
    Timer.prototype.subMonths = function (months) {
        return this.addMonths(-months);
    };
    Timer.prototype.subWeeks = function (weeks) {
        if (weeks) {
            this.result = new Date(this.result.getTime() - 7 * weeks * this.dayMS);
        }
        return this;
    };
    Timer.prototype.subDays = function (days) {
        if (days) {
            this.result = new Date(this.result.getTime() - days * this.dayMS);
        }
        return this;
    };
    Timer.prototype.subHours = function (hours) {
        if (hours) {
            this.result = new Date(this.result.getTime() - hours * this.hourMS);
        }
        return this;
    };
    Timer.prototype.subMinutes = function (minutes) {
        if (minutes) {
            this.result = new Date(this.result.getTime() - minutes * this.minuteMS);
        }
        return this;
    };
    Timer.prototype.subSeconds = function (seconds) {
        if (seconds) {
            this.result = new Date(this.result.getTime() - seconds * this.secondMS);
        }
        return this;
    };
    Timer.prototype.subMilliseconds = function (milliseconds) {
        if (milliseconds) {
            this.result = new Date(this.result.getTime() - milliseconds);
        }
        return this;
    };
    Timer.prototype.setYear = function (year, month, date) {
        if (month === void 0) { month = null; }
        if (date === void 0) { date = null; }
        if (year) {
            this.result.setFullYear(year, month, date);
        }
        return this;
    };
    Timer.prototype.setMonth = function (month, date) {
        if (date === void 0) { date = null; }
        if (month) {
            this.result.setMonth(month, date);
        }
        return this;
    };
    Timer.prototype.setDate = function (date) {
        if (date) {
            this.result.setDate(date);
        }
        return this;
    };
    Timer.prototype.getDay = function () {
        return this.result.getDay();
    };
    Timer.prototype.getHours = function () {
        return this.result.getHours();
    };
    Timer.prototype.getMinutes = function () {
        return this.result.getMinutes();
    };
    Timer.prototype.getSeconds = function () {
        return this.result.getSeconds();
    };
    Timer.prototype.getTime = function () {
        return this.result.getTime();
    };
    Timer.prototype.getDate = function () {
        return this.result;
    };
    Timer.prototype.getISOString = function () {
        return this.result.toISOString();
    };
    Timer.prototype.getUTCString = function () {
        return this.result.toUTCString();
    };
    Timer.prototype.format = function (formatString) {
        if (formatString) {
            var formatter = new formatter_1.default(this.result, formatString);
            return formatter.execute();
        }
    };
    return Timer;
}());
exports.default = Timer;
var checkTypes = function (options) {
    if (typeof options === 'number') {
        return true;
    }
    else {
        if (options.days && typeof options.days !== 'number') {
            throw new Error('Value provided for days is not a number.');
        }
        else if (options.hours && typeof options.hours !== 'number') {
            throw new Error('Value provided for hours is not a number.');
        }
        else if (options.minutes && typeof options.minutes !== 'number') {
            throw new Error('Value provided for minutes is not a number.');
        }
        else if (options.seconds && typeof options.seconds !== 'number') {
            throw new Error('Value provided for seconds is not a number.');
        }
        else if (options.milliseconds &&
            typeof options.milliseconds !== 'number') {
            throw new Error('Value provided for milliseconds is not a number.');
        }
    }
};
var ensureNumber = function (value) {
    if (isNaN(value)) {
        throw new Error('Value provided is not a valid number.');
    }
    else if (typeof value === 'string') {
        return Number(value);
    }
    return value;
};
var getDaysInMonth = function (date) {
    var year = date.getFullYear();
    var monthIndex = date.getMonth();
    var lastDayOfMonth = new Date(0);
    lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
    lastDayOfMonth.setHours(0, 0, 0, 0);
    return lastDayOfMonth.getDate();
};
