
export const parsePrice = price => {
  price = price / 100
  if (!price) price = 0
  if (isNaN(parseFloat((`${price}`).replace(',', '.')))) price = 0
  return (`${parseFloat((`${price}`).replace(',', '.')).toFixed(2)}`).replace('.', ',')
}

export const parsePriceAndSign = price => {
  price = price / 100
  if (!price) price = 0
  if (isNaN(parseFloat((`${price}`).replace(',', '.')))) price = 0
  return (`${parseFloat((`${price}`).replace(',', '.')).toFixed(2)}`).replace('.', ',') + ' €'
}

export const priceFloatToInt = price => {
  price = (price + '').replace(',', '.')
  const priceLength = price.length
  const dividerPos = price.indexOf('.')
  const decimalPlaces = priceLength - dividerPos - 1
  if (dividerPos === -1) {
    return price + '00'
  } else if (decimalPlaces === 2) {
    return price.replace('.', '')
  } else if (decimalPlaces === 1) {
    return price.replace('.', '') + '0'
  } else {
    return price.replace('.', '').substring(0, priceLength - 1 - (decimalPlaces - 2))
  }
}
