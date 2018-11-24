import {Database} from "../interfaces/Database";
import {calculateProgress, getRandomCountry, getRandomVovoideship} from "./ProgressCalculate";
import {Area} from "../interfaces/Area";
import {Position} from "../interfaces/Position";
import {Bet} from "../interfaces/Bet";

export function calculateLottery(db:Database, config:any):void{
    if(calculateProgress(db.bets, Area.VOIVODESHIP, config.VOIVODESHIP_LIMIT) > 1){
        calculateResults(db, Area.VOIVODESHIP, config.VOIVODESHIP_PRIZE, 1);
    }
    if(calculateProgress(db.bets, Area.COUNTRY, config.COUNTRY_LIMIT) > 1){
        calculateResults(db, Area.COUNTRY, config.COUNTRY_PRIZE, 1);
    }
}

export function calculateResults(db:Database, type: Area, prize: number, minimumWin: number):void {
    const randomPoint:Position = type === Area.VOIVODESHIP ? getRandomVovoideship() : getRandomCountry();
    const bets = db.bets.filter((bet: Bet) => bet.area === type);
    const oldBets = db.bets.filter((bet: Bet) => bet.area !== type);

    let distanceGlobal = 0;
    const betsScores = bets.map((bet:Bet) => {
        const { lon , lat } = bet.position;
        let range = Math.sqrt((randomPoint.lon - lon)^2 + (randomPoint.lat - lat)^2) - bet.distanceFactor ;
        range = range < 0 ? range : 0;
        distanceGlobal = range + distanceGlobal;
        return {
            range,
            bet,
            revertRange: 0,
            prize : 0
        };
    });

    let revertDistanceGlobal = 0;
    const factors = betsScores.map((score) => {
        score.revertRange = distanceGlobal / score.range;
        revertDistanceGlobal = revertDistanceGlobal + score.revertRange;
        return score;
    });
    let totalPrizes = 0;
    const prizes = factors.filter((factor) => {
        const betPrize = (factor.revertRange / revertDistanceGlobal * prize);
        factor.prize = betPrize >= minimumWin ? prize : 0;
        totalPrizes = totalPrizes + factor.prize;
        return factor.prize;
    });
    const sorted = prizes.sort((a, b) => (a.prize > b.prize ? 1 : -1));
    const id:string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    db.results.push({
        id: id,
        position: randomPoint,
        time: Date.now(),
        winners: sorted.map((score) => {
            return {
              userId: score.bet.userId,
              prize: score.prize
            };
        })
    });
    db.betsArchive = db.betsArchive.concat(bets);
    db.bets = oldBets;
}