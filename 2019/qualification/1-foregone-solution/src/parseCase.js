export const parseCase = (line, data) => {
  const { isProcessing, ...result } = data

  result.N = line

  return result
}
