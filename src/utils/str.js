
const replaceSCZ = (str) => {
  return str.replace('š', 's').replace('č', 'c').replace('ž', 'z')
}

export const siIncludes = ({ haystack, needle }) => {
  if (!haystack || !needle) return true
  return replaceSCZ(haystack.toLowerCase()).includes(replaceSCZ(needle.toLowerCase()))
}

export const siMatch = ({ str1, str2 }) => {
  if (!str1 || !str2) return true
  return replaceSCZ(str1.toLowerCase()) === replaceSCZ(str2.toLowerCase())
}
