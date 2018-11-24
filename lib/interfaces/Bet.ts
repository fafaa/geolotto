import {Area} from "./Area";
import {Position} from './Position';

export interface Bet {
    id: string
    position: Position
    userId: string
    rangeFactor: number,
    distanceFactor: number
    reflink: string
    area: Area
}
