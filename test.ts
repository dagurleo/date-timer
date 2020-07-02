import Timer from './src/timer'
import Formatter from './src/formatter'

const test = new Timer()
console.log(test.getISOString())
test.subYears(0).subMonths(3)
console.log(test.getISOString())
test.subDays(32)
console.log(test.getISOString())
test.subDays(10)
console.log(test.getISOString())
