import { type Color, type GameInfo } from '../../features';

export interface InfoProps extends GameInfo {
    currentColor: Color;
}