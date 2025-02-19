// function to format number to K = 1000 = 1K, 20.000 = 20K
export const formatNumberToK = (value: number): string => {
  if (value > 1_000) {
    return (value / 1_000).toFixed(1) + "K"
  }

  if (value > 1_000_000) {
    return (value / 1_000_000).toFixed(1) + "M"
  }

  return value.toString()
}
