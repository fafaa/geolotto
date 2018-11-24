import {Database} from "../interfaces/Database";
import {calculateProgress} from "./ProgressCalculate";
import {Area} from "../interfaces/Area";

export function calculateLottery(db:Database, config:any):void{
    if(calculateProgress(db.bets, Area.VOIVODESHIP, config.VOIVODESHIP_LIMIT) > 100){
        calculateResults(db, Area.VOIVODESHIP);
    }
    if(calculateProgress(db.bets, Area.COUNTRY, config.COUNTRY_LIMIT) > 100){
        calculateResults(db, Area.COUNTRY);
    }
}

export function calculateResults(db:Database, type: Area):void {
    const randomPoint = []

}