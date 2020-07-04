# Date Timer

[![](https://img.shields.io/npm/dm/date-timer?style=flat-square)](https://www.npmjs.com/package/date-timer)
[![](https://img.shields.io/npm/v/date-timer?style=flat-square)](https://www.npmjs.com/package/date-timer)
[![](https://data.jsdelivr.com/v1/package/npm/date-timer/badge)](https://www.jsdelivr.com/package/npm/date-timer)
[![](https://img.shields.io/npm/l/date-timer?style=flat-square)](https://choosealicense.com/licenses/mit/)

Date Timer is a simple date timer library written in Typescript.
Currently the core is being developed so do not use for production codebases yet.

## Installation

Use [yarn](https://yarnpkg.com/) or [npm](https://npmjs.org) to install date-timer

```bash
# Yarn
yarn add date-timer

#npm
npm i date-timer
```

## Usage

```javascript
// ES5
const DateTimer = require('date-timer')
const date = new DateTimer()
// Creates a new date timer object with the current timestamp

// ES6+
import DateTimer from 'date-timer'
const date = new DateTimer()
// Creates a new date timer object with the current timestamp
```

---

### Method chaining

Most methods in the DateTimer class return the DateTimer object so chaining
methods is available

#### Example

```javascript
const date = new DateTimer() // 2020-01-01T00:00:00.000Z
date.addYears(2).addMonths(3).addDays(2) // 2022-04-03T00:00:00.000Z
```

---

## Documentation

### Date Timer Methods

<details>
  <summary>Click to Open</summary>

#### addYears(years: number): DateTimer

Adds years to the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01
date.addYears(1) // 2021-01-01
```

---

#### addMonths(months: number): DateTimer

Adds months to the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01
date.addMonth(1) // 2020-02-01
```

---

#### addWeeks(weeks: number): DateTimer

Adds weeks to the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01
date.addWeeks(1) // 2020-01-08
```

---

#### addDays(days: number): DateTimer

Adds days to the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01
date.addDays(1) // 2020-01-02
```

---

#### addHours(hours: number): DateTimer

Adds hours to the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01T00:00:00.000Z
date.addHours(1) // 2020-01-01T01:00:00.000Z
```

---

#### addMinutes(minutes: number): DateTimer

Adds minutes to the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01T00:00:00.000Z
date.addMinutes(1) // 2020-01-01T00:01:00.000Z
```

---

#### addSeconds(seconds: number): DateTimer

Adds seconds to the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01T00:00:00.000Z
date.addSeconds(1) // 2020-01-01T00:00:01.000Z
```

#### addMilliseconds(seconds: number): DateTimer

Adds milliseconds to the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01T00:00:00.000Z
date.addMilliseconds(1) // 2020-01-01T00:00:00.001Z
```

---

#### subYears(years: number): DateTimer

Subtracts years from the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01
date.subYears(1) // 2019-01-01
```

---

#### subMonths(months: number): DateTimer

Subtracts months from the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01
date.subMonths(1) // 2019-12-01
```

---

#### subWeeks(weeks: number): DateTimer

Subtracts weeks from the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01
date.subWeeks(1) // 2019-12-25
```

---

#### subDays(days: number): DateTimer

Subtracts days from the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01
date.subDays(1) // 2019-12-31
```

---

#### subHours(hours: number): DateTimer

Subtracts hours from the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01T00:00:00.000Z
date.subHours(1) // 2019-12-31T23:00:00.000Z
```

---

#### subMinutes(minutes: number): DateTimer

Subtracts minutes from the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01T00:00:00.000Z
date.subMinutes(1) // 2019-12-31T23:59:00.000Z
```

---

#### subSeconds(seconds: number): DateTimer

Subtracts seconds from the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01T00:00:00.000Z
date.subSeconds(1) // 2019-12-31T23:59:59.000Z
```

#### subMilliseconds(seconds: number): DateTimer

Subtracts milliseconds from the date.
Returns the DateTimer Object.

```javascript
const date = new DateTimer() // 2020-01-01T00:00:00.000Z
date.subMilliseconds(1) // 2019-12-31T23:59:59.999Z
```

</details>

## Roadmap

- Build for web
- Add more comparison methods

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
