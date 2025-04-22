export const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  const pad = (num: number) => String(num).padStart(2, "0")

  if (h > 0) {
    return `${h}:${pad(m)}:${pad(s)}`
  } else {
    return `${pad(m)}:${pad(s)}`
  }
}
