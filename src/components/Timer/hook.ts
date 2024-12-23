import { useEffect, useMemo, useRef, useState } from 'react';
import { type UseTimer, type UseTimerOptions } from './types';
import { addSeconds } from 'date-fns';

export const useTimer = (options: UseTimerOptions): UseTimer => {
    const { date, duration } = options;
    const finishDateValue = useMemo(() => addSeconds(date, duration).valueOf(), [ date, duration ]);
    const [ timeLeft, setTimeLeft ] = useState(0);
    const timerRef = useRef<Nullable<number>>(null);
    const minutes = (timeLeft / 60) >> 0;
    const seconds = timeLeft % 60;


    useEffect(() => {
        const onSet = (): void => {
            const now = Date.now();

            setTimeLeft(now < finishDateValue ? ((finishDateValue - now) / 1000) >> 0: 0);

            timerRef.current = setTimeout(onSet, 1000);
        };

        onSet();

        return (): void => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [ finishDateValue ]);

    return {
        timeLeft: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        isLessMinute: minutes < 1
    };
};