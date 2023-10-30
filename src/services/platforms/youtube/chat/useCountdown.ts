import { useEffect, useState } from 'react'

export default function useCountdown(targetDate: Date = new Date()) {
  const [countDown, setCountDown] = useState(timeLeft(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(timeLeft(targetDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return Math.floor(countDown / 1000)
}

function timeLeft(targetDate: Date) {
  return Math.max(targetDate.getTime() - Date.now(), 0)
}
