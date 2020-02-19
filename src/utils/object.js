const countObjectProperties = obj => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length
  }
  return 0
}

const removeEmptyProperties = obj => {
  const objCopy = { ...obj }
  Object.keys(objCopy).forEach(key => {
    if ([null, undefined].includes(objCopy[key])) {
      delete objCopy[key]
    }
  })
  return objCopy
}

const arrayToObject = arr => {
  const newObj = {}
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i]
    el.sort = i
    newObj[el.id] = el
  }
  return newObj
}

const objectToArray = obj => {
  if (typeof obj !== 'object') return []
  const arr = Object.values(obj)
  if (typeof arr[0] === 'object' && arr[0].hasOwnProperty('sort_order')) {
    return arr.sort((a, b) => a.sort_order > b.sort_order ? 1 : -1)
  }
  return arr.sort((a, b) => a.sort > b.sort ? 1 : -1)
}

export {
  countObjectProperties,
  removeEmptyProperties,
  arrayToObject,
  objectToArray,
}
