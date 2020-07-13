import DateTimer from '../src/DateTimer'
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
    const timer = new DateTimer(date)
    expect(timer).toBeInstanceOf(DateTimer)
  })

  it('Creates a timer from the create function', () => {
    const timer = DateTimer.create()
    expect(timer).toBeInstanceOf(DateTimer)
  })

  it('Creates a timer from the create function with options', () => {
    const date = createDefaultTestDate()
    const timer = DateTimer.create(defaultTimerOptions)
    expect(timer.getDate()).toEqual(date.getDate())
    expect(timer.getHours()).toEqual(date.getHours())
    expect(timer.getMinutes()).toEqual(date.getMinutes())
    expect(timer.getSeconds()).toEqual(date.getSeconds())
  })

  it('Returns date object that equals created object', () => {
    const date = createDefaultTestDate()
    const timer = new DateTimer(date)
    expect(timer.getJsDate()).toEqual(date)
  })

  it('Creates a timestamp using the static function', () => {
    const timestamp = DateTimer.static()
    expect(typeof timestamp).toEqual('number')
  })
})
describe('Test add functions', () => {
  it('Adds days', () => {
    const addDays = 3
    const date = createDefaultTestDate()
    const timer = new DateTimer(date)
    date.setUTCDate(date.getUTCDate() + addDays)
    timer.addDays(addDays)
    expect(timer.getISOString()).toEqual(date.toISOString())
  })

  it('Adds hours', () => {
    const addHours = 3
    const date = createDefaultTestDate()
    date.setUTCHours(date.getUTCHours() + addHours)
    const timer = new DateTimer(defaultTimerOptions)
    timer.addHours(addHours)
    expect(timer.getISOString()).toEqual(date.toISOString())
    expect(timer.getHours()).toEqual(date.getHours())
    expect(timer.getUTCString()).toEqual(date.toUTCString())
  })

  it('Adds minutes', () => {
    const addMinutes = 60
    const date = createDefaultTestDate()
    date.setUTCMinutes(date.getUTCMinutes() + addMinutes)
    const timer = new DateTimer(defaultTimerOptions)
    timer.addMinutes(addMinutes)
    expect(timer.getISOString()).toEqual(date.toISOString())
    expect(timer.getUTCHours()).toEqual(date.getUTCHours())
    expect(timer.getUTCMinutes()).toEqual(date.getUTCMinutes())
  })

  it('Adds seconds', () => {
    const addSeconds = 75
    const date = createDefaultTestDate()
    date.setUTCSeconds(date.getUTCSeconds() + addSeconds)
    const timer = new DateTimer(defaultTimerOptions)
    timer.addSeconds(addSeconds)
    expect(timer.getUTCSeconds()).toEqual(date.getUTCSeconds())
    expect(timer.getUTCMinutes()).toEqual(date.getUTCMinutes())
  })

  it('Adds milliseconds', () => {
    const addMilliseconds = 75
    const date = createDefaultTestDate()
    date.setUTCMilliseconds(date.getUTCMilliseconds() + addMilliseconds)
    const timer = new DateTimer(defaultTimerOptions)
    timer.addMilliseconds(addMilliseconds)
    expect(timer.getUTCMilliseconds()).toEqual(date.getUTCMilliseconds())
    expect(timer.getUTCMinutes()).toEqual(date.getUTCMinutes())
  })
})

describe('Test subtract functions', () => {
  it('Subtracts days', () => {
    const subDays = 3
    const date = createDefaultTestDate()
    date.setUTCDate(date.getUTCDate() - subDays)
    const timer = new DateTimer(defaultTimerOptions)
    timer.subDays(subDays)
    expect(timer.getUTCDate()).toEqual(date.getUTCDate())
    expect(timer.getISOString()).toEqual(date.toISOString())
  })

  it('Subtracts hours', () => {
    const subhours = 15
    const date = createDefaultTestDate()
    date.setUTCHours(date.getUTCHours() - subhours)
    const timer = new DateTimer(defaultTimerOptions)
    timer.subHours(subhours)
    expect(timer.getISOString()).toEqual(date.toISOString())
    expect(timer.getUTCHours()).toEqual(date.getUTCHours())
    expect(timer.getHours()).toEqual(date.getHours())
  })

  it('Subracts minutes', () => {
    const subminutes = 75
    const date = createDefaultTestDate()
    date.setUTCMinutes(date.getUTCMinutes() - subminutes)
    const timer = new DateTimer(defaultTimerOptions)
    timer.subMinutes(subminutes)
    expect(timer.getISOString()).toEqual(date.toISOString())
    expect(timer.getUTCMinutes()).toEqual(date.getUTCMinutes())
    expect(timer.getMinutes()).toEqual(date.getMinutes())
  })

  it('Subracts seconds', () => {
    const subSeconds = 75
    const date = createDefaultTestDate()
    date.setUTCSeconds(date.getUTCSeconds() - subSeconds)
    const timer = new DateTimer(defaultTimerOptions)
    timer.subSeconds(subSeconds)
    expect(timer.getISOString()).toEqual(date.toISOString())
    expect(timer.getUTCMinutes()).toEqual(date.getUTCMinutes())
    expect(timer.getMinutes()).toEqual(date.getMinutes())
    expect(timer.getSeconds()).toEqual(date.getSeconds())
    expect(timer.getUTCSeconds()).toEqual(date.getUTCSeconds())
  })

  it('Subracts milliseconds', () => {
    const subMilliseconds = 3000
    const date = createDefaultTestDate()
    date.setUTCMilliseconds(date.getUTCMilliseconds() - subMilliseconds)
    const timer = new DateTimer(defaultTimerOptions)
    timer.subMilliseconds(subMilliseconds)
    expect(timer.getISOString()).toEqual(date.toISOString())
    expect(timer.getUTCMinutes()).toEqual(date.getUTCMinutes())
    expect(timer.getMinutes()).toEqual(date.getMinutes())
    expect(timer.getSeconds()).toEqual(date.getSeconds())
    expect(timer.getUTCSeconds()).toEqual(date.getUTCSeconds())
    expect(timer.getUTCMilliseconds()).toEqual(date.getUTCMilliseconds())
  })
})

describe('Test comparison functions', () => {
  it('Checks if isFuture() returns false for a past date', () => {
    const timer = new DateTimer(defaultTimerOptions)
    expect(timer.isFuture()).toEqual(false)
  })

  it('Checks if isFuture() returns true for a future date', () => {
    const timer = new DateTimer()
    timer.addDays(3)
    expect(timer.isFuture()).toEqual(true)
  })

  it('Checks if isPast() returns true for a past date', () => {
    const timer = new DateTimer(defaultTimerOptions)
    expect(timer.isPast()).toEqual(true)
  })

  it('Checks if isPast() returns false for a future date', () => {
    const timer = new DateTimer()
    timer.addDays(3)
    expect(timer.isPast()).toEqual(false)
  })
})

describe('Test on change function', () => {
  it('Tests onchange', () => {
    const timer = new DateTimer()
    timer.onChange = () => {
      console.log(this)
    }
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
