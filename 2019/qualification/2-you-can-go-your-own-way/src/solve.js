export const solve = (data) => {
  const { P } = data

  const result = P.split('')
    .map(c => c === 'E' ? 'S' : 'E')
    .join('')

  return result
}
