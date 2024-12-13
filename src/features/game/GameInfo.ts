export type GameInfoStatus = 'in_progress' | 'finished';

export type GameInfoDetail = 'white' | 'black' | 'draw';

export interface GameInfo {
    status: GameInfoStatus;
    detail?: GameInfoDetail;
}