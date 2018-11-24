import {Bet} from "./Bet";
import {Result} from "./Result";

export interface Database {
    bets : Bet[],
    betsArchive: Bet[],
    users: User[],
    results: Result[]
}