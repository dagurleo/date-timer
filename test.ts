import DateTimer from './src/DateTimer'
import Formatter from './src/formatter'

const test = new DateTimer()
// console.log(test.getISOString())
// test.subYears(0).subMonths(3)
// console.log(test.getISOString())
// test.subDays(32)
// console.log(test.getISOString())
// test.subDays(10)
// console.log(test.getISOString())

const localString = test.getJsDate().toLocaleString()
// console.log(localString)
const dd = test.format('YYYY-MM-DD HH:mm:ss')
console.log(dd)

console.log(test.formatLocal('DDD MMMM dd h:mmA'))
console.log(test.format('DDD MMMM dd h:mmA'))
