export const parseCase = (line, data) => {
  const { isProcessing, ...result } = data

  if (!result.N) {
    result.N = parseInt(line)
    result.isProcessing = true
    return result
  }

  result.P = line

  return result
}
