const Timer = require('.')

const timer = new Timer()
// console.log(timer.getISOString())
// timer.addMonths(2).addDays(104).addMonths(1)
// console.log(timer.getISOString())
// timer.addYears(1)
// console.log(timer.getISOString())
// timer.subYears(5)
// console.log(timer.getISOString())
// timer.setYear(1952)
console.log(timer.getISOString())
timer.addHours(9)
console.log(timer.format('YYYY-MM-DD HH:mm:ss.SSS'))
console.log(timer.format('hh:mm:ss.SS DD-MM-YYYY'))
console.log(timer.format('hh:mmA DD-MM-YYYY'))
timer.addHours(9)
console.log(timer.format('HH:mmA DD-MM-YYYY'))
