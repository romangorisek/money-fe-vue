
export const parsePrice = price => {
  if (!price) return ''
  if (isNaN(parseFloat((`${price}`).replace(',', '.')))) return ''
  return (`${parseFloat((`${price}`).replace(',', '.')).toFixed(2)}`).replace('.', ',')
}
