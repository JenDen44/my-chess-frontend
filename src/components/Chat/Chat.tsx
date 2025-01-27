import { type FC } from 'react';
import { type ChatProps } from './types';
import { Box } from '@mui/material';

export const Chat: FC<ChatProps> = (props) => {
    const { token } = props;

    if (!token) return null;

    return (
        <Box
            component='iframe'
            src={`http://localhost:3001/?token=${token}`}
            sx={{ border: 'none', flexGrow: 1 }}
        />
    );
};