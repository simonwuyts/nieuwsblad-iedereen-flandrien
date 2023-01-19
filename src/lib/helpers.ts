export function generateDateKey(date: Date) {
  const dateYear = date.getFullYear()
  const dateMonth = date.getMonth() + 1
  const dateDay = date.getDate()
  return `${dateYear}-${dateMonth}-${dateDay}`
}

export function numberAdjective(number: number) {
  const values: {
    [key: string]: string
  } = {
    '1': 'eerste',
    '2': 'tweede',
    '3': 'derde',
    '4': 'vierde',
    '5': 'vijfde',
    '6': 'zesde',
  }
  return values[number.toString()] || 'volgende'
}
