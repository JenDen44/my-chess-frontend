import { type FC } from 'react';
import { type TimerProps } from './types';
import { Typography } from '@mui/material';
import { useTimer } from './hook';

export const Timer: FC<TimerProps> = (props) => {
    const { timeLeft, isLessMinute } = useTimer(props);

    return (
        <Typography
            variant="h6"
            align="center"
            color={isLessMinute ? 'error' : 'textSecondary'}
        >
            Осталось на ход: {timeLeft}
        </Typography>
    );

};