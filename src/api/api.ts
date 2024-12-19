import { client } from '../client';
import { type Game, type Color, type GameInfo, type Move } from '../features';

export const start = (color: Color): Promise<Game> =>
    client.post<Game>('/api/start', { color }).then((res) => res.data);

export const getGame = (token: string): Promise<Game> => {
    const headers = {
        Authorization: `Bearer ${ token }`
    };

    return client.get<Game>('/api/game', { headers }).then((res) => res.data);
};

export const move = (token: string, moveInfo: Move): Promise<GameInfo> => {
    const headers = {
        Authorization: `Bearer ${ token }`
    };

    return client.post<GameInfo>('/api/game/move', moveInfo, { headers }).then((res) => res.data);
};

export const giveUp = (token: string): Promise<GameInfo> => {
    const headers = {
        Authorization: `Bearer ${ token }`
    };

    return client.post<GameInfo>('/api/game/give-up', undefined, { headers }).then((res) => res.data);
};

export const draw = (token: string): Promise<void> => {
    const headers = {
        Authorization: `Bearer ${ token }`
    };

    return client.post<void>('/api/game/draw', undefined, { headers }).then();
};

export const drawAnswer = (token: string, isDraw: boolean): Promise<void> => {
    const headers = {
        Authorization: `Bearer ${ token }`
    };

    return client.post<void>(`/api/game/draw/${isDraw}`, undefined, { headers }).then();
};
