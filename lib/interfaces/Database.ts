import {Bet} from "./Bet";

export interface Database {
    bets : Bet[],
    betsArchive: Bet[],
    users: User[],
    results: Result[]
}