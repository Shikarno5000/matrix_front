// количество целых дней до ожидаемого дня
export const dayDiff = (firstDate: string | number | null, secondDate: string | number | null): number | null => {
  if (!firstDate || !secondDate) {
    return null
  }
  const first = typeof firstDate === 'string' ? Date.parse(firstDate) : firstDate
  const second = typeof secondDate === 'string' ? Date.parse(secondDate) : secondDate
  return Math.floor((first - second) / 86400000)
}
// количество дней прошло с днями
export function lastStatusChange (date: string) {
  const diff: number | null = dayDiff(new Date().toISOString(), date)
  return `${diff} дн.`
}

// прибавить к дате рабочих дней
export function addWorkDays (startDate: string, days: number) {
  const date = new Date(startDate)
  const dir = days < 0 ? -1 : 1
  days = Math.abs(days)
  while (days) {
    date.setDate(date.getDate() + dir)
    if (isWorkDay(date) && isNoHoliday(date)) {
      days--
    }
  }
  return date.toISOString().split('T')[0]
}
// прибавить к дате дней
export function addDays (startDate: string, days: number) {
  const date = new Date(startDate)
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}
function isWorkDay (date: Date) {
  const exception = ['2024-04-27', '2024-11-02', '2024-01-06', '2024-12-28', '2024-01-07']
  if (exception.includes(date.toISOString().split('T')[0])) {
    return true
  }
  return ![6, 0].includes(date.getDay())
}
function isNoHoliday (date: Date) {
  const holidays = [
    {
      month: 1,
      days: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
      month: 2,
      days: [23]
    },
    {
      month: 3,
      days: [8]
    },
    {
      month: 4,
      days: [29, 30]
    },
    {
      month: 5,
      days: [1, 9, 10]
    },
    {
      month: 6,
      days: [12]
    },
    {
      month: 11,
      days: [4]
    },
    {
      month: 12,
      days: [30, 31]
    }
  ]
  const month = date.getMonth() + 1
  const monthArray = holidays.find(i => i.month === month)
  if (monthArray) {
    return !monthArray.days.includes(date.getDate())
  }
  return true
}

// прибавление процентов
export const formatTime = function (time: any, format: string | null = null) {
  if (!time) {
    return ''
  }
  format = format || (time.length > 10 ? 'YYYY.mm.dd hh:MM' : 'YYYY.mm.dd')
  time = new Date(new Date(time).getTime() + (3 * 60 * 60 * 1000))
  const add0 = function (t: any) {
    return t < 10 ? '0' + t : t
  }
  const year = time.getFullYear()
  const month = time.getMonth() + 1 // 0 indexed
  const date = time.getDate()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const replaceMent = {
    yy: year.toString().substr(-2),
    YYYY: year.toString(),
    mm: add0(month),
    m: month,
    dd: add0(date),
    d: date,
    hh: add0(hours),
    h: hours,
    MM: add0(minutes),
    M: minutes,
    ss: add0(seconds),
    s: seconds
  }
  for (const key in replaceMent) {
    format = format.replace(key, replaceMent[key as keyof typeof replaceMent])
  }
  return format
}
