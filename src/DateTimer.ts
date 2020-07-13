import Formatter from './formatter'
class DateTimer {
  private result: Date
  private onChangeFunction?: (timer?: DateTimer) => void
  constructor(options?: IDateTimerOptions | number | string | Date) {
    if (options) {
      try {
        if (typeof options === 'number') {
          this.result = new Date(options)
        } else if (typeof options === 'string') {
          this.result = new Date(options)
        } else if (options instanceof Date) {
          this.result = options
        } else {
          checkTypes(options)
          const date = new Date()
          if (options) {
            if (options.years !== null) {
              date.setUTCFullYear(options.years)
            }
            if (options.months !== null) {
              date.setUTCMonth(options.months)
            }
            if (options.days !== null) {
              date.setUTCDate(options.days)
            }
            if (options.hours !== null) {
              date.setUTCHours(options.hours)
            }
            if (options.minutes !== null) {
              date.setUTCMinutes(options.minutes)
            }
            if (options.seconds !== null) {
              date.setUTCSeconds(options.seconds)
            }
            if (options.milliseconds !== null) {
              date.setUTCMilliseconds(options.milliseconds)
            }
          }

          this.result = date
        }
      } catch (error) {
        throw new Error('Provided options were not a valid date.')
      }
    } else {
      this.result = new Date()
    }
  }

  public static static(options?: IDateTimerOptions): number {
    return new DateTimer(options).getTime()
  }

  public static create(options?: IDateTimerOptions): DateTimer {
    if (options) {
      checkTypes(options)
    }
    return new DateTimer(options)
  }

  // Add time values to current DateTimer

  public add(type: string, num: number): DateTimer {
    switch (type) {
      case EAddType.years:
        return this.addYears(num)
      case EAddType.months:
        return this.addMonths(num)
      case EAddType.weeks:
        return this.addWeeks(num)
      case EAddType.days:
        return this.addDays(num)
      case EAddType.hours:
        return this.addHours(num)
      case EAddType.minutes:
        return this.addMinutes(num)
      case EAddType.seconds:
        return this.addSeconds(num)
      case EAddType.milliseconds:
        return this.addMilliseconds(num)
      default:
        return this
    }
  }

  /**  Adds years to the date */
  public addYears(years: number): DateTimer {
    years = ensureNumber(years)
    if (years) {
      const desiredYear = this.result.getFullYear() + years
      this.result.setFullYear(desiredYear)
    }
    return this
  }
  /**  Adds months to the date */
  public addMonths(months: number): DateTimer {
    months = ensureNumber(months)
    if (months) {
      const result = new Date(this.result.toISOString())
      const desiredMonth = this.result.getUTCMonth() + months
      result.setUTCFullYear(this.result.getUTCFullYear(), desiredMonth, 1)
      const daysInMonth = getDaysInMonth(result)
      this.result.setUTCMonth(
        desiredMonth,
        Math.min(daysInMonth, this.result.getUTCDate())
      )
    }
    return this
  }

  /**  Adds weeks to the date */
  public addWeeks(weeks: number): DateTimer {
    weeks = ensureNumber(weeks)
    if (weeks) {
      const desiredDay = this.result.getUTCDate() + 7 * weeks
      this.result.setUTCDate(desiredDay)
    }
    return this
  }

  /**  Adds days to the date */
  public addDays(days: number): DateTimer {
    if (days) {
      days = ensureNumber(days)
      const desiredDay = this.result.getUTCDate() + days
      this.result.setUTCDate(desiredDay)
    }
    return this
  }

  /**  Adds hours to the date */
  public addHours(hours: number, cb?: (timer?: DateTimer) => void): DateTimer {
    hours = ensureNumber(hours)
    if (hours) {
      const desiredHour = this.result.getUTCHours() + hours
      this.result.setUTCHours(desiredHour)
    }
    cb?.()
    this.runOnChange()
    return this
  }

  /**  Adds minutes to the date */
  public addMinutes(minutes: number): DateTimer {
    minutes = ensureNumber(minutes)
    if (minutes) {
      const desiredMinutes = this.result.getUTCMinutes() + minutes
      this.result.setUTCMinutes(desiredMinutes)
    }
    return this
  }

  /**  Adds seconds to the date */
  public addSeconds(seconds: number): DateTimer {
    seconds = ensureNumber(seconds)
    if (seconds) {
      const desiredSeconds = this.result.getUTCSeconds() + seconds
      this.result.setUTCSeconds(desiredSeconds)
    }
    return this
  }

  /**  Adds milliseconds to the date */
  public addMilliseconds(milliseconds: number): DateTimer {
    milliseconds = ensureNumber(milliseconds)
    if (milliseconds) {
      const desiredMilliSeconds =
        this.result.getUTCMilliseconds() + milliseconds
      this.result.setUTCMilliseconds(desiredMilliSeconds)
    }
    return this
  }

  // Sub time values from current DateTimer

  public sub(type: string, num: number): DateTimer {
    switch (type) {
      case EAddType.weeks:
        return this.subWeeks(num)
      case EAddType.days:
        return this.subDays(num)
      case EAddType.hours:
        return this.subHours(num)
      case EAddType.minutes:
        return this.subMinutes(num)
      case EAddType.seconds:
        return this.subSeconds(num)
      case EAddType.milliseconds:
        return this.subMilliseconds(num)
      default:
        return this
    }
  }

  /**  Subtracts years from the date */
  public subYears(years: number): DateTimer {
    return this.addYears(-years)
  }

  /**  Subtracts months from the date */
  public subMonths(months: number): DateTimer {
    return this.addMonths(-months)
  }

  /**  Subtracts weeks from the date */
  public subWeeks(weeks: number): DateTimer {
    return this.addWeeks(-weeks)
  }

  /**  Subtracts days from the date */
  public subDays(days: number): DateTimer {
    return this.addDays(-days)
  }

  /**  Subtracts hours from the date */
  public subHours(hours: number): DateTimer {
    return this.addHours(-hours)
  }

  /**  Subtracts minutes from the date */
  public subMinutes(minutes: number): DateTimer {
    return this.addMinutes(-minutes)
  }

  /**  Subtracts seconds from the date */
  public subSeconds(seconds: number): DateTimer {
    return this.addSeconds(-seconds)
  }

  /**  Subtracts milliseconds from the date */
  public subMilliseconds(milliseconds: number): DateTimer {
    return this.addMilliseconds(-milliseconds)
  }

  /** Sets the year value in the Date object using local time. */
  public setYear(
    year: number,
    month: number = null,
    date: number = null
  ): DateTimer {
    if (year) {
      this.result.setFullYear(year, month, date)
    }
    return this
  }

  /** Sets the month value in the Date object using local time. */
  public setMonth(month: number, date: number = null): DateTimer {
    if (month) {
      this.result.setMonth(month, date)
    }
    return this
  }
  /** Sets the day value in the Date object using local time. */
  public setDate(date: number): DateTimer {
    if (date) {
      this.result.setDate(date)
    }
    return this
  }

  /** Sets the hour value in the Date object using local time. */
  public setHours(
    hours: number,
    min: number = null,
    sec: number = null,
    ms: number = null
  ): DateTimer {
    if (hours) {
      this.result.setHours(hours, min, sec, ms)
    }
    return this
  }

  /** Sets the minute value in the Date object using local time. */
  public setMinutes(
    min: number,
    sec: number = null,
    ms: number = null
  ): DateTimer {
    if (min) {
      this.result.setMinutes(min, sec, ms)
    }
    return this
  }

  /** Sets the second value in the Date object using local time. */
  public setSeconds(sec: number, ms: number = null): DateTimer {
    if (sec) {
      this.result.setSeconds(sec, ms)
    }
    return this
  }

  /** Sets the millisecond value in the Date object using local time. */
  public setMilliSeconds(ms: number = null): DateTimer {
    if (ms) {
      this.result.setMilliseconds(ms)
    }
    return this
  }

  /** Sets the year value in the Date object using Universal Coordinated Time (UTC). */
  public setUTCYear(
    year: number,
    month: number = null,
    date: number = null
  ): DateTimer {
    if (year) {
      this.result.setUTCFullYear(year, month, date)
    }
    return this
  }

  /** Sets the month value in the Date object using Universal Coordinated Time (UTC). */
  public setUTCMonth(month: number, date: number = null): DateTimer {
    if (month) {
      this.result.setUTCMonth(month, date)
    }
    return this
  }

  /** Sets the day value in the Date object using Universal Coordinated Time (UTC). */
  public setUTCDate(date: number): DateTimer {
    if (date) {
      this.result.setUTCDate(date)
    }
    return this
  }

  /** Sets the hour value in the Date object using Universal Coordinated Time (UTC). */
  public setUTCHours(
    hours: number,
    min: number = null,
    sec: number = null,
    ms: number = null
  ): DateTimer {
    if (hours) {
      this.result.setUTCHours(hours, min, sec, ms)
    }
    return this
  }

  /** Sets the minute value in the Date object using Universal Coordinated Time (UTC). */
  public setUTCMinutes(
    min: number,
    sec: number = null,
    ms: number = null
  ): DateTimer {
    if (min) {
      this.result.setUTCMinutes(min, sec, ms)
    }
    return this
  }

  /** Sets the second value in the Date object using Universal Coordinated Time (UTC). */
  public setUTCSeconds(sec: number, ms: number = null): DateTimer {
    if (sec) {
      this.result.setUTCSeconds(sec, ms)
    }
    return this
  }

  /** Sets the millisecond value in the Date object using Universal Coordinated Time (UTC). */
  public setUTCMilliSeconds(ms: number = null): DateTimer {
    if (ms) {
      this.result.setUTCMilliseconds(ms)
    }
    return this
  }

  /** Gets the day of the week, using local time. */
  public getDay(): number {
    return this.result.getDay()
  }

  /** Gets the hours in a date, using local time. */
  public getHours(): number {
    return this.result.getHours()
  }

  /** Gets the minutes of a Date object, using local time.*/
  public getMinutes(): number {
    return this.result.getMinutes()
  }

  /** Gets the seconds of a Date object, using local time.*/
  public getSeconds(): number {
    return this.result.getSeconds()
  }

  /** Gets the milliseconds of a Date object, using local time.*/
  public getTime(): number {
    return this.result.getTime()
  }

  /** Gets the day-of-the-month, using local time.*/
  public getDate(): number {
    return this.result.getDate()
  }

  /** Gets the day of the week using Universal Coordinated Time (UTC).*/
  public getUTCDay(): number {
    return this.result.getUTCDay()
  }

  /** Gets the hours value in a Date object using Universal Coordinated Time (UTC). */
  public getUTCHours(): number {
    return this.result.getUTCHours()
  }

  /** Gets the minutes value in a Date object using Universal Coordinated Time (UTC). */
  public getUTCMinutes(): number {
    return this.result.getUTCMinutes()
  }

  /** Gets the seconds value in a Date object using Universal Coordinated Time (UTC). */
  public getUTCSeconds(): number {
    return this.result.getUTCSeconds()
  }

  /** Gets the milli seconds value in a Date object using Universal Coordinated Time (UTC). */
  public getUTCMilliseconds(): number {
    return this.result.getUTCMilliseconds()
  }

  /** Gets the day-of-the-month, using Universal Coordinated Time (UTC).*/
  public getUTCDate(): number {
    return this.result.getUTCDate()
  }

  /** Returns a date as a string value in ISO format. */
  public getISOString(): string {
    return this.result.toISOString()
  }

  /** Returns a date converted to a string using Universal Coordinated Time (UTC). */
  public getUTCString(): string {
    return this.result.toUTCString()
  }

  /** Returns the Javascript date object. */
  public getJsDate(): Date {
    return this.result
  }

  /** Formats and returns the UTC date string.
   * Use formatLocal(formatString: string) for a local time string
   * See docuentation for format values */
  public format(formatString: string) {
    if (formatString) {
      return Formatter.format(this.result, formatString)
    }
  }

  /** Formats and returns the local date string. See docuentation for format values */
  public formatLocal(formatString: string) {
    if (formatString) {
      return Formatter.format(
        new Date(this.result.toLocaleString()),
        formatString,
        true
      )
    }
  }

  /** Returns how many whole days are between the 2 dates. */
  public daysBetween(date: Date | DateTimer | string | number): number {
    let compareDate: Date
    if (date instanceof Date) {
      compareDate = date
    } else if (date instanceof DateTimer) {
      compareDate = date.getJsDate()
    } else if (typeof date === 'string' || typeof date === 'number') {
      compareDate = new Date(date)
    } else {
      throw new Error('Provided value is not a valid date.')
    }
    const result =
      (this.result.getTime() - compareDate.getTime()) / (24 * 60 * 60 * 1000)

    return result > 0 ? Math.floor(result) : Math.ceil(result)
  }

  /** Returns true if the current date result is in the future */
  public isFuture(): boolean {
    return new Date().getTime() < this.result.getTime()
  }

  /** Returns true if the current date result is in the past */
  public isPast(): boolean {
    return new Date().getTime() > this.result.getTime()
  }

  /** Returns a clone DateTimer */
  public clone(): DateTimer {
    return new DateTimer(this.getJsDate())
  }

  /** A function that is run whenever a time value is changed.
   * NOTE: This function is run before the change function returns */
  public onChange(func: (timer?: DateTimer) => void): void {
    if (func) {
      this.onChangeFunction = func
    }
  }

  private runOnChange(): void {
    if (this.onChangeFunction) {
      this.onChangeFunction(this)
    }
  }
}

export default DateTimer

const checkTypes = (options: IDateTimerOptions | number): boolean => {
  if (typeof options === 'number') {
    return true
  } else {
    if (options.days !== null && typeof options.days !== 'number') {
      throw new Error('Value provided for days is not a number.')
    } else if (options.hours !== null && typeof options.hours !== 'number') {
      throw new Error('Value provided for hours is not a number.')
    } else if (
      options.minutes !== null &&
      typeof options.minutes !== 'number'
    ) {
      throw new Error('Value provided for minutes is not a number.')
    } else if (
      options.seconds !== null &&
      typeof options.seconds !== 'number'
    ) {
      throw new Error('Value provided for seconds is not a number.')
    } else if (
      options.milliseconds &&
      typeof options.milliseconds !== 'number'
    ) {
      throw new Error('Value provided for milliseconds is not a number.')
    }
  }
}

const ensureNumber = (value: any) => {
  if (isNaN(value)) {
    throw new Error('Value provided is not a valid number.')
  } else if (typeof value === 'string') {
    return Number(value)
  }
  return value
}
const getDaysInMonth = (date: Date) => {
  var year = date.getUTCFullYear()
  var monthIndex = date.getUTCMonth()

  var lastDayOfMonth = new Date(0)
  lastDayOfMonth.setUTCFullYear(year, monthIndex, 0)
  lastDayOfMonth.setUTCHours(0, 0, 0, 0)

  return lastDayOfMonth.getUTCDate()
}
interface IDateTimerOptions {
  years?: number
  months?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}

enum EAddType {
  years = 'years',
  months = 'months',
  weeks = 'weeks',
  days = 'days',
  hours = 'hours',
  minutes = 'minutes',
  seconds = 'seconds',
  milliseconds = 'milliseconds',
}
