import {Database} from "../interfaces/Database";
import {calculateProgress, getRandomCountry, getRandomVovoideship} from "./ProgressCalculate";
import {Area} from "../interfaces/Area";
import {Position} from "../interfaces/Position";
import {Bet} from "../interfaces/Bet";

export function calculateLottery(db:Database, config:any):void{
    if(calculateProgress(db.bets, Area.VOIVODESHIP, config.VOIVODESHIP_LIMIT) > 1){
        calculateResults(db, Area.VOIVODESHIP);
    }
    if(calculateProgress(db.bets, Area.COUNTRY, config.COUNTRY_LIMIT) > 1){
        calculateResults(db, Area.COUNTRY);
    }
}

export function calculateResults(db:Database, type: Area):void {
    const randomPoint:Position = type === Area.VOIVODESHIP ? getRandomVovoideship() : getRandomCountry();
    const bets = db.bets.filter((bet: Bet) => bet.area === type);
    const oldBets = db.bets.filter((bet: Bet) => bet.area !== type);

    db.bets = oldBets;
}