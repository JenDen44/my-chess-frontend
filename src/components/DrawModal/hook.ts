import { useCallback, useEffect, useState } from 'react';
import { draw } from '../../api';
import { useWebsocket, type WebSocketData } from '../../hooks';
import { type UseDrawModalOptions, type UseDrawModal } from './types';

export const useDrawModal = (options: UseDrawModalOptions): UseDrawModal => {
    const { token, onClose } = options;
    const [ isWait, setWait ] = useState(false);
    const onDraw = useCallback(() => {
        if (!token) return;

        draw(token).then(() => {
            setWait(true);
        });
    }, [ token ]);
    const handleClose = useCallback(() => {
        setWait(false);
        onClose();
    }, [ onClose ]);
    const { onSubscribe, onUnsubscribe } = useWebsocket(token);
    const onMessage = useCallback((data: WebSocketData) => {
        if (data.type === 'DRAW_RESPONSE') {
            handleClose();
        }
    }, [ handleClose ]);

    useEffect(() => {
        onSubscribe(onMessage);

        return (): void => onUnsubscribe(onMessage);
    }, [ onSubscribe, onUnsubscribe, onMessage ]);

    return { isWait, onClose: handleClose, onDraw };

};