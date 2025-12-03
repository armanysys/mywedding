import { useEffect, useState } from "react"

export function useCountdown(targetDateISO: string) {
    const getTargetTime = () => new Date(targetDateISO).getTime()

    // Basic validation: warn if provided date is invalid
    useEffect(() => {
        const t = new Date(targetDateISO)
        if (isNaN(t.getTime())) {
            // eslint-disable-next-line no-console
            console.warn(`Countdown: targetDateISO is not a valid date string: ${targetDateISO}`)
        }
    }, [targetDateISO])

    const [timeLeft, setTimeLeft] = useState(() => {
        const diff = getTargetTime() - Date.now()
        return diff > 0 ? diff : 0
    })

    useEffect(() => {
        const timer = setInterval(() => {
            const diff = getTargetTime() - Date.now()
            setTimeLeft(diff > 0 ? diff : 0)
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDateISO])

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
    const seconds = Math.floor((timeLeft / 1000) % 60)

    const pad = (n: number) => n.toString().padStart(2, "0")

    return { days, hours, minutes, seconds, pad }
}
