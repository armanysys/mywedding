"use client"

import { useCountdown } from "./useCountdown"

export function Countdown({ targetDateISO }: { targetDateISO: string }) {
    const { days, hours, minutes, seconds, pad } = useCountdown(targetDateISO)

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
