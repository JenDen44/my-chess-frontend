import { type Color, type GameInfo } from '../../features';

export type WebSocketData = {
    type: 'PLAYER_MOVED';
    entity: {
        fromX: number;
        fromY: number;
        toX: number;
        toY: number;
        activeColor: Color;
    }
} | {
    type: 'STATUS_CHANGED';
    entity: GameInfo;
}

export type WebsocketSubscriber = (event: WebSocketData) => void;

export interface UseWebsocket {
    onSubscribe: (subscriber: WebsocketSubscriber) => void;
    onUnsubscribe: (subscriber: WebsocketSubscriber) => void;
}