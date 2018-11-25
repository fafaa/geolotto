import {Position} from './Position';
import {Area} from "./Area";

export interface Result {
    id: string,
    time: number,
    position: Position
    winners: Array<{
        userId: string
        prize: number
        betId?: string,
        distance?: number,
        area?: Area,
        position?: Position
    }>,
    total: number,
    winnersTotal: number,
    betsTotal: number,
    area: Area
}