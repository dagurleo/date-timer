const Timer = require('.')
const test = new Timer().subYears(131).subMonths(2).subDays(12)
console.log(test)

console.log(test.getISOString())

// console.log(formatter.format())
