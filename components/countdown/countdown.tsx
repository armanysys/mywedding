"use client"

import { useEffect, useState } from "react"

export function Countdown({ targetDateISO }: { targetDateISO: string }) {
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

    return (
        <div className="w-full flex justify-center mt-6">
            <div className="w-full max-w-4xl px-4">
                <p className="text-sm md:text-base uppercase tracking-wider mb-2 text-center">Solo faltan</p>

                <div
                    className="flex items-center justify-center gap-4 text-center text-white"
                    role="status"
                    aria-live="polite"
                >
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-semibold">{days}</span>
                        <span className="text-xs uppercase tracking-wider mt-1">Días</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-semibold">{pad(hours)}</span>
                        <span className="text-xs uppercase tracking-wider mt-1">Horas</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-semibold">{pad(minutes)}</span>
                        <span className="text-xs uppercase tracking-wider mt-1">Minutos</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-semibold">{pad(seconds)}</span>
                        <span className="text-xs uppercase tracking-wider mt-1">Segundos</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
