import { useCallback, useEffect, useRef } from 'react';
import { type UseWebsocket, type WebsocketSubscriber } from './types';

export const useWebsocket = (token?: string): UseWebsocket => {
    const webSocketRef = useRef<Nullable<WebSocket>>(null);
    const subscribersRef = useRef(new Set<WebsocketSubscriber>());
    const onSendToken = useCallback((token: string): void => {
        try {
            webSocketRef.current?.send(token);
        } catch (error) {
            console.error(error);

            setTimeout((): void => {
                onSendToken(token);
            }, 1000);
        }
    }, []);
    const onSubscribe = useCallback((subscriber: WebsocketSubscriber) => {
        subscribersRef.current.add(subscriber);
    }, []);
    const onUnsubscribe = useCallback((subscriber: WebsocketSubscriber) => {
        subscribersRef.current.delete(subscriber);
    }, []);

    useEffect(() => {
        if (webSocketRef.current) {
            webSocketRef.current.close();
        }

        if (!token) {
            webSocketRef.current = null;
            return;
        }

        webSocketRef.current = new WebSocket('/ws');
        webSocketRef.current.onopen = (): void => {
            onSendToken(token);
        };
        webSocketRef.current.onclose = (event: CloseEvent): void => {
            const { code } = event;

            if (code === 1003) {
                webSocketRef.current = null;
            }
        };
        webSocketRef.current.onmessage = (event: MessageEvent): void => {
            const data = JSON.parse(event.data);

            subscribersRef.current.forEach((subscriber) => {
                try {
                    subscriber(data);
                } catch(error) {
                    console.log(error);
                }
            });
        };
    }, [ token, onSendToken ]);

    return { onSubscribe, onUnsubscribe };
};
