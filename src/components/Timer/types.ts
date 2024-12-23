export interface TimerProps {
    date: Date;
    duration: number;
}

export interface UseTimerOptions {
    date: Date;
    duration: number;
}

export interface UseTimer {
    timeLeft: string;
    isLessMinute: boolean;
}
