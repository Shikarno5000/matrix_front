type objectWithId = {
  id: number
}
export const getIndex = <T extends objectWithId>(array: T[], id: number) => array.findIndex(i => i.id === id)
export const getById = <T extends objectWithId>(array: T[], id: number) => array.find(item => id === item.id) || null
export const getNameById = (array: any[], id: number, code: string = 'name'): string => {
  const index = array.findIndex(i => i.id === id)
  return index !== -1 ? array[index][code] : ''
}
// добавление кода в свойствах для store
export function addCode(values: any) {
  for (const key in values) {
    values[key as keyof typeof values].code = key
  }
  return values
}

// расчет процентов
export const percentCalculation = (one: number, two: number) => {
  return +(+((one / two) * 100).toFixed(2)).toFixed(2)
}
// прибавление процентов
export const plusPercent = (number: number, percent: number) => {
  return number * (1 + percent / 100)
}

// вывод цены в правильном формате
export const priceSet = (data: number) => {
  if (!data || typeof data !== 'number') {
    return ''
  }
  const price = Number.prototype.toFixed.call(data || 0, 2)
  const priceSep = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')

  return priceSep + ' руб.'
}
