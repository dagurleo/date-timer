import Formatter from './formatter'
class Timer {
  private result: Date
  constructor(options?: ITimerOptions | number | string | Date) {
    if (options) {
      if (typeof options === 'number') {
        this.result = new Date(options)
      } else if (typeof options === 'string') {
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
    } else {
      this.result = new Date()
    }
  }

  public static static(options?: ITimerOptions): number {
    return new Timer(options).getTime()
  }

  public static create(options?: ITimerOptions): Timer {
    if (options) {
      checkTypes(options)
    }
    return new Timer(options)
  }

  // Add time values to current timer

  public add(type: string, num: number): Timer {
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

  public addYears(years: number): Timer {
    years = ensureNumber(years)
    if (years) {
      const desiredYear = this.result.getFullYear() + years
      this.result.setFullYear(desiredYear)
    }
    return this
  }

  public addMonths(months: number): Timer {
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

  public addWeeks(weeks: number): Timer {
    weeks = ensureNumber(weeks)
    if (weeks) {
      const desiredDay = this.result.getUTCDate() + 7 * weeks
      this.result.setUTCDate(desiredDay)
    }
    return this
  }

  public addDays(days: number): Timer {
    if (days) {
      days = ensureNumber(days)
      const desiredDay = this.result.getUTCDate() + days
      this.result.setUTCDate(desiredDay)
    }
    return this
  }

  public addHours(hours: number): Timer {
    hours = ensureNumber(hours)
    if (hours) {
      const desiredHour = this.result.getUTCHours() + hours
      this.result.setUTCHours(desiredHour)
    }
    return this
  }

  public addMinutes(minutes: number): Timer {
    minutes = ensureNumber(minutes)
    if (minutes) {
      const desiredMinutes = this.result.getUTCMinutes() + minutes
      this.result.setUTCMinutes(desiredMinutes)
    }
    return this
  }

  public addSeconds(seconds: number): Timer {
    seconds = ensureNumber(seconds)
    if (seconds) {
      const desiredSeconds = this.result.getUTCSeconds() + seconds
      this.result.setUTCSeconds(desiredSeconds)
    }
    return this
  }

  public addMilliseconds(milliseconds: number): Timer {
    milliseconds = ensureNumber(milliseconds)
    if (milliseconds) {
      const desiredMilliSeconds =
        this.result.getUTCMilliseconds() + milliseconds
      this.result.setUTCMilliseconds(desiredMilliSeconds)
    }
    return this
  }

  // Sub time values from current timer

  public sub(type: string, num: number): Timer {
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
  public subYears(years: number): Timer {
    return this.addYears(-years)
  }

  public subMonths(months: number): Timer {
    return this.addMonths(-months)
  }

  public subWeeks(weeks: number): Timer {
    return this.addWeeks(-weeks)
  }

  public subDays(days: number): Timer {
    return this.addDays(-days)
  }

  public subHours(hours: number): Timer {
    return this.addHours(-hours)
  }

  public subMinutes(minutes: number): Timer {
    return this.addMinutes(-minutes)
  }

  public subSeconds(seconds: number): Timer {
    return this.addSeconds(-seconds)
  }

  public subMilliseconds(milliseconds: number): Timer {
    return this.addMilliseconds(-milliseconds)
  }

  public setYear(
    year: number,
    month: number = null,
    date: number = null
  ): Timer {
    if (year) {
      this.result.setFullYear(year, month, date)
    }
    return this
  }

  public setMonth(month: number, date: number = null): Timer {
    if (month) {
      this.result.setMonth(month, date)
    }
    return this
  }

  public setDate(date: number): Timer {
    if (date) {
      this.result.setDate(date)
    }
    return this
  }

  public setHours(
    hours: number,
    min: number = null,
    sec: number = null,
    ms: number = null
  ): Timer {
    if (hours) {
      this.result.setHours(hours, min, sec, ms)
    }
    return this
  }

  public setMinutes(min: number, sec: number = null, ms: number = null): Timer {
    if (min) {
      this.result.setMinutes(min, sec, ms)
    }
    return this
  }

  public setSeconds(sec: number, ms: number = null): Timer {
    if (sec) {
      this.result.setSeconds(sec, ms)
    }
    return this
  }

  public setMilliSeconds(ms: number = null): Timer {
    if (ms) {
      this.result.setMilliseconds(ms)
    }
    return this
  }

  public getDay(): number {
    return this.result.getDay()
  }

  public getHours(): number {
    return this.result.getHours()
  }

  public getMinutes(): number {
    return this.result.getMinutes()
  }

  public getSeconds(): number {
    return this.result.getSeconds()
  }

  public getTime(): number {
    return this.result.getTime()
  }

  public getDate(): number {
    return this.result.getDate()
  }

  public getUTCDay(): number {
    return this.result.getUTCDay()
  }

  public getUTCHours(): number {
    return this.result.getUTCHours()
  }

  public getUTCMinutes(): number {
    return this.result.getUTCMinutes()
  }

  public getUTCSeconds(): number {
    return this.result.getUTCSeconds()
  }

  public getUTCDate(): number {
    return this.result.getUTCDate()
  }

  public getISOString(): string {
    return this.result.toISOString()
  }

  public getUTCString(): string {
    return this.result.toUTCString()
  }

  public getJsDate(): Date {
    return this.result
  }

  public format(formatString: string) {
    if (formatString) {
      return Formatter.format(this.result, formatString)
    }
  }

  public daysBetween(date: Date | Timer | string | number): number {
    let compareDate: Date
    if (date instanceof Date) {
      compareDate = date
    } else if (date instanceof Timer) {
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

  public clone(): Timer {
    return new Timer(this.getJsDate())
  }
}

export default Timer

const checkTypes = (options: ITimerOptions | number): boolean => {
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
interface ITimerOptions {
  years?: number
  months?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}

export enum EAddType {
  years = 'years',
  months = 'months',
  weeks = 'weeks',
  days = 'days',
  hours = 'hours',
  minutes = 'minutes',
  seconds = 'seconds',
  milliseconds = 'milliseconds',
}
