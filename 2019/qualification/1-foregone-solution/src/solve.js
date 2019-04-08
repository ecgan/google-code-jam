export const solve = (data) => {
  const { N } = data
  const A = []
  const B = []

  N.split('').forEach(c => {
    if (c === '4') {
      A.push('2')
      B.push('2')
    } else {
      A.push(c)

      if (B.length > 0) {
        B.push('0')
      }
    }
  })

  const result = `${A.join('')} ${B.join('')}`

  return result
}
