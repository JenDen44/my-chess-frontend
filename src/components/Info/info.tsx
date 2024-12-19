import { type FC } from 'react';
import { type InfoProps } from './types';
import { getInfo } from './utils';
import Typography  from '@mui/material/Typography';

export const Info: FC<InfoProps> = (props) => {
    const { status, detail, currentColor } = props;

    return (
        <Typography variant="h5" textAlign="center">
            {getInfo(currentColor, status, detail)}
        </Typography>
    );
};