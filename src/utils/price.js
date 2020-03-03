
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
