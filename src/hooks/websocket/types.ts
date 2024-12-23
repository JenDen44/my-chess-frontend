import { type Color, type GameInfo } from '../../features';

export type WebSocketData = {
    type: 'PLAYER_MOVED';
    entity: {
        fromX: number;
        fromY: number;
        toX: number;
        toY: number;
        activeColor: Color;
        date: string;
    }
} | {
    type: 'STATUS_CHANGED';
    entity: GameInfo;
} | {
    type: 'DRAW_REQUEST';
} | {
    type: 'DRAW_RESPONSE';
    entity: boolean;
}

export type WebsocketSubscriber = (event: WebSocketData) => void;

export interface UseWebsocket {
    onSubscribe: (subscriber: WebsocketSubscriber) => void;
    onUnsubscribe: (subscriber: WebsocketSubscriber) => void;
}