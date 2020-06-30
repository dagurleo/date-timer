enum EDateStringPiece {
  fullYear = 'YYYY',
  fullMonth = 'MM',
  fullDay = 'DD',
  fullHour = 'HH',
  fullMinute = 'mm',
  fullSecond = 'ss',
  fullMilliSecond = 'SS',
  fullMilliSecondWithTimezone = 'SSS',
  halfMonth = 'M',
  halfDay = 'D',
  halfHour = 'hh',
  halfMinute = 'm',
  halfSecond = 's',
  halfWordMonth = 'MMM',
  fullWordMonth = 'MMMM',
  wordDay = 'DDD',
  ordinalDay = 'dd',
  ampm = 'A',
}

class Formatter {
  private date: Date
  private formatString: string
  private year: number
  private month: number
  private day: number
  private hour: number
  private minute: number
  private second: number
  private millisecond: number
  private days: Array<string>
  private months: Array<string>
  constructor(date: Date | string, format: string) {
    if (typeof date === 'string') {
      this.date = new Date(date)
    } else {
      this.date = date
    }
    this.formatString = format
    this.year = this.date.getUTCFullYear()
    this.month = this.date.getUTCMonth()
    this.day = this.date.getUTCDate()
    this.hour = this.date.getUTCHours()
    this.minute = this.date.getUTCMinutes()
    this.second = this.date.getSeconds()
    this.millisecond = this.date.getMilliseconds()
    this.days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
  }

  public format(formatString?: string) {
    const formattingTokensRegExp = new RegExp(
      /[yYQqMLwIdDecihHKkmsaA]o|(\w)\1*|''|'(''|[^'])+('|$)|./g
    ) // This RegExp catches symbols escaped by quotes, and also
    const toFormatString = formatString || this.formatString
    let result = ''
    toFormatString.match(formattingTokensRegExp).forEach((value: string) => {
      result += Formatter.getFormatForPiece(this, value)
    })

    return result
  }

  static format(date: Date, formatString: string) {
    const formatter = new Formatter(date, formatString)
    return formatter.format()
  }

  static getFormatForPiece(formatter: Formatter, piece: string) {
    switch (piece) {
      case EDateStringPiece.fullYear:
        return formatter.year.toString()
      case EDateStringPiece.fullMonth:
        return Formatter.prependZero(formatter.month + 1)
      case EDateStringPiece.fullDay:
        return Formatter.prependZero(formatter.day)
      case EDateStringPiece.fullHour:
        return Formatter.prependZero(formatter.hour)
      case EDateStringPiece.fullMinute:
        return Formatter.prependZero(formatter.minute)
      case EDateStringPiece.fullSecond:
        return Formatter.prependZero(formatter.second)
      case EDateStringPiece.fullMilliSecond:
        return Formatter.prependZero(formatter.millisecond)
      case EDateStringPiece.fullMilliSecondWithTimezone:
        return Formatter.prependZeroMilli(formatter.millisecond) + 'Z'
      case EDateStringPiece.halfMonth:
        return (formatter.month + 1).toString()
      case EDateStringPiece.halfDay:
        return formatter.day.toString()
      case EDateStringPiece.halfHour:
        return Formatter.prependZero(
          formatter.hour > 12 ? formatter.hour - 12 : formatter.hour
        )
      case EDateStringPiece.halfMinute:
        return formatter.minute.toString()
      case EDateStringPiece.halfSecond:
        return formatter.second.toString()
      case EDateStringPiece.fullWordMonth:
        return formatter.months[formatter.month]
      case EDateStringPiece.halfWordMonth:
        return formatter.months[formatter.month].substr(3)
      case EDateStringPiece.wordDay:
        return formatter.days[formatter.date.getUTCDay()]
      case EDateStringPiece.ampm:
        return formatter.hour > 12 ? 'PM' : 'AM'
      case EDateStringPiece.ordinalDay:
        return Formatter.getOrdinal(formatter.day)
      default:
        return piece
    }
  }

  static getOrdinal(num: number): string {
    return (
      num +
      (num > 0
        ? ['th', 'st', 'nd', 'rd'][
            (num > 3 && num < 21) || num % 10 > 3 ? 0 : num % 10
          ]
        : '')
    )
  }
  static prependZero(num: number): string {
    if (num < 10) {
      return '0' + num
    } else {
      return num.toString()
    }
  }
  static prependZeroMilli(num: number): string {
    if (num < 100) {
      return '0' + num
    } else {
      return num.toString()
    }
  }
}

export default Formatter
