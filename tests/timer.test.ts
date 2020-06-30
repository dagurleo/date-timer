import Timer, { EAddType } from '../src/timer'
const defaultTimerOptions = {
  years: 2020,
  months: 5,
  days: 10,
  hours: 13,
  minutes: 15,
  seconds: 0,
  milliseconds: 0,
}

describe('Test creation of date objects', () => {
  it('Creates when passed a date object', () => {
    const date = new Date()
    const timer = new Timer(date)
    expect(timer).toBeInstanceOf(Timer)
  })

  it('Creates a timer from the create function', () => {
    const timer = Timer.create()
    expect(timer).toBeInstanceOf(Timer)
  })

  it('Creates a timer from the create function with options', () => {
    const date = createDefaultTestDate()
    const timer = Timer.create(defaultTimerOptions)
    expect(timer.getDate()).toEqual(date.getDate())
    expect(timer.getHours()).toEqual(date.getHours())
    expect(timer.getMinutes()).toEqual(date.getMinutes())
    expect(timer.getSeconds()).toEqual(date.getSeconds())
  })
  it('Returns date object that equals created object', () => {
    const date = createDefaultTestDate()
    const timer = new Timer(date)
    expect(timer.getJsDate()).toEqual(date)
  })
  it('Creates a timestamp using the static function', () => {
    const timestamp = Timer.static()
    expect(typeof timestamp).toEqual('number')
  })
})
describe('Test add functions', () => {
  it('Adds days', () => {
    const addDays = 3
    const date = createDefaultTestDate()
    const timer = new Timer(date)
    date.setUTCDate(date.getUTCDate() + addDays)
    timer.addDays(addDays)
    expect(timer.getISOString()).toEqual(date.toISOString())
  })
  it('Adds hours', () => {
    const addHours = 3
    const date = createDefaultTestDate()
    date.setUTCHours(date.getUTCHours() + addHours)
    const timer = new Timer(defaultTimerOptions)
    timer.addHours(addHours)
    expect(timer.getISOString()).toEqual(date.toISOString())
    expect(timer.getHours()).toEqual(date.getHours())
    expect(timer.getUTCString()).toEqual(date.toUTCString())
  })
  it('Adds minutes', () => {
    const addMinutes = 60
    const date = createDefaultTestDate()
    date.setUTCMinutes(date.getUTCMinutes() + addMinutes)
    const timer = new Timer(defaultTimerOptions)
    timer.addMinutes(addMinutes)
    expect(timer.getISOString()).toEqual(date.toISOString())
    expect(timer.getUTCHours()).toEqual(date.getUTCHours())
    expect(timer.getUTCMinutes()).toEqual(date.getUTCMinutes())
  })

  it('Adds minutes', () => {
    const addSeconds = 75
    const date = createDefaultTestDate()
    date.setUTCSeconds(date.getUTCSeconds() + addSeconds)
    const timer = new Timer(defaultTimerOptions)
    timer.addSeconds(addSeconds)
    expect(timer.getUTCSeconds()).toEqual(date.getUTCSeconds())
    expect(timer.getUTCMinutes()).toEqual(date.getUTCMinutes())
  })
})
describe('Test enums', () => {
  it('Tests enums have not changed', () => {
    expect(EAddType.years).toEqual('years')
    expect(EAddType.months).toEqual('months')
    expect(EAddType.weeks).toEqual('weeks')
    expect(EAddType.days).toEqual('days')
    expect(EAddType.hours).toEqual('hours')
    expect(EAddType.minutes).toEqual('minutes')
    expect(EAddType.seconds).toEqual('seconds')
    expect(EAddType.milliseconds).toEqual('milliseconds')
  })
})

const createDefaultTestDate = () => {
  const date = new Date()
  date.setUTCFullYear(defaultTimerOptions.years)
  date.setUTCMonth(defaultTimerOptions.months)
  date.setUTCDate(defaultTimerOptions.days)
  date.setUTCHours(defaultTimerOptions.hours)
  date.setUTCMinutes(defaultTimerOptions.minutes)
  date.setUTCSeconds(defaultTimerOptions.seconds)
  date.setUTCMilliseconds(defaultTimerOptions.milliseconds)
  return date
}
