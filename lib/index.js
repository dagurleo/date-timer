"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAddType = void 0;
var formatter_1 = __importDefault(require("./formatter"));
var Timer = /** @class */ (function () {
    function Timer(options) {
        this.secondMS = 1000;
        this.minuteMS = this.secondMS * 60;
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
                checkTypes(options);
                var date = new Date();
                if (options) {
                    if (options.years !== null) {
                        date.setUTCFullYear(options.years);
                    }
                    if (options.months !== null) {
                        date.setUTCMonth(options.months);
                    }
                    if (options.days !== null) {
                        date.setUTCDate(options.days);
                    }
                    if (options.hours !== null) {
                        date.setUTCHours(options.hours);
                    }
                    if (options.minutes !== null) {
                        date.setUTCMinutes(options.minutes);
                    }
                    if (options.seconds !== null) {
                        date.setUTCSeconds(options.seconds);
                    }
                    if (options.milliseconds !== null) {
                        date.setUTCMilliseconds(options.milliseconds);
                    }
                }
                this.result = date;
            }
        }
        else {
            this.result = new Date();
        }
    }
    Timer.static = function (options) {
        return new Timer(options).getTime();
    };
    Timer.create = function (options) {
        if (options) {
            checkTypes(options);
        }
        return new Timer(options);
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
            this.result.setMonth(desiredMonth, Math.min(daysInMonth, this.result.getUTCDate()));
        }
        return this;
    };
    Timer.prototype.addWeeks = function (weeks) {
        weeks = ensureNumber(weeks);
        if (weeks) {
            var desiredDay = this.result.getUTCDate() + 7 * weeks;
            this.result.setUTCDate(desiredDay);
        }
        return this;
    };
    Timer.prototype.addDays = function (days) {
        if (days) {
            days = ensureNumber(days);
            var desiredDay = this.result.getUTCDate() + days;
            this.result.setUTCDate(desiredDay);
        }
        return this;
    };
    Timer.prototype.addHours = function (hours) {
        hours = ensureNumber(hours);
        if (hours) {
            var desiredHour = this.result.getUTCHours() + hours;
            this.result.setUTCHours(desiredHour);
        }
        return this;
    };
    Timer.prototype.addMinutes = function (minutes) {
        minutes = ensureNumber(minutes);
        if (minutes) {
            var desiredMinutes = this.result.getUTCMinutes() + minutes;
            this.result.setUTCMinutes(desiredMinutes);
        }
        return this;
    };
    Timer.prototype.addSeconds = function (seconds) {
        seconds = ensureNumber(seconds);
        if (seconds) {
            var desiredSeconds = this.result.getUTCSeconds() + seconds;
            this.result.setUTCSeconds(desiredSeconds);
        }
        return this;
    };
    Timer.prototype.addMilliseconds = function (milliseconds) {
        milliseconds = ensureNumber(milliseconds);
        if (milliseconds) {
            var desiredMilliSeconds = this.result.getUTCMilliseconds() + milliseconds;
            this.result.setUTCMilliseconds(desiredMilliSeconds);
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
        return this.addWeeks(-weeks);
    };
    Timer.prototype.subDays = function (days) {
        return this.addDays(-days);
    };
    Timer.prototype.subHours = function (hours) {
        return this.addHours(-hours);
    };
    Timer.prototype.subMinutes = function (minutes) {
        return this.addMinutes(-minutes);
    };
    Timer.prototype.subSeconds = function (seconds) {
        return this.addSeconds(-seconds);
    };
    Timer.prototype.subMilliseconds = function (milliseconds) {
        return this.addMilliseconds(-milliseconds);
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
    Timer.prototype.setHours = function (hours, min, sec, ms) {
        if (min === void 0) { min = null; }
        if (sec === void 0) { sec = null; }
        if (ms === void 0) { ms = null; }
        if (hours) {
            this.result.setHours(hours, min, sec, ms);
        }
        return this;
    };
    Timer.prototype.setMinutes = function (min, sec, ms) {
        if (sec === void 0) { sec = null; }
        if (ms === void 0) { ms = null; }
        if (min) {
            this.result.setMinutes(min, sec, ms);
        }
        return this;
    };
    Timer.prototype.setSeconds = function (sec, ms) {
        if (ms === void 0) { ms = null; }
        if (sec) {
            this.result.setSeconds(sec, ms);
        }
        return this;
    };
    Timer.prototype.setMilliSeconds = function (ms) {
        if (ms === void 0) { ms = null; }
        if (ms) {
            this.result.setMilliseconds(ms);
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
        return this.result.getDate();
    };
    Timer.prototype.getUTCDay = function () {
        return this.result.getUTCDay();
    };
    Timer.prototype.getUTCHours = function () {
        return this.result.getUTCHours();
    };
    Timer.prototype.getUTCMinutes = function () {
        return this.result.getUTCMinutes();
    };
    Timer.prototype.getUTCSeconds = function () {
        return this.result.getUTCSeconds();
    };
    Timer.prototype.getUTCDate = function () {
        return this.result.getUTCDate();
    };
    Timer.prototype.getISOString = function () {
        return this.result.toISOString();
    };
    Timer.prototype.getUTCString = function () {
        return this.result.toUTCString();
    };
    Timer.prototype.getJsDate = function () {
        return this.result;
    };
    Timer.prototype.format = function (formatString) {
        if (formatString) {
            return formatter_1.default.format(this.result, formatString);
        }
    };
    Timer.prototype.daysBetween = function (date) {
        var compareDate;
        if (date instanceof Date) {
            compareDate = date;
        }
        else if (date instanceof Timer) {
            compareDate = date.getJsDate();
        }
        else if (typeof date === 'string' || typeof date === 'number') {
            compareDate = new Date(date);
        }
        else {
            throw new Error('Provided value is not a valid date.');
        }
        var result = (this.result.getTime() - compareDate.getTime()) / (24 * 60 * 60 * 1000);
        return result > 0 ? Math.floor(result) : Math.ceil(result);
    };
    Timer.prototype.clone = function () {
        return new Timer(this.getJsDate());
    };
    return Timer;
}());
exports.default = Timer;
var checkTypes = function (options) {
    if (typeof options === 'number') {
        return true;
    }
    else {
        if (options.days !== null && typeof options.days !== 'number') {
            throw new Error('Value provided for days is not a number.');
        }
        else if (options.hours !== null && typeof options.hours !== 'number') {
            throw new Error('Value provided for hours is not a number.');
        }
        else if (options.minutes !== null &&
            typeof options.minutes !== 'number') {
            throw new Error('Value provided for minutes is not a number.');
        }
        else if (options.seconds !== null &&
            typeof options.seconds !== 'number') {
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
    return lastDayOfMonth.getUTCDate();
};
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
})(EAddType = exports.EAddType || (exports.EAddType = {}));
