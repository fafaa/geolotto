import {Position} from './Position';

export interface Result {
    id: string,
    time: number,
    position: Position
    winners: Array<{
        userId: string
        prize: number
    }>
}