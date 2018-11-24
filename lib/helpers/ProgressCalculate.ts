import {Area} from "../interfaces/Area";
import {Bet} from "../interfaces/Bet";
/**
 *
 * @param bets
 * @param type
 * @param max
 * @constructor
 */

export function calculateProgress(bets: Bet[], type: Area, max: number) {
    const count = bets.reduce((acc: number, bet: Bet) => {
        if(bet.area === type){
            acc++
        }
        return acc;
    }, 0);

    return Math.round((count/max) * 100) / 100;
}

const WARSAW_CORDS = { lon: 20.003, lat: 52.009 };
const POLAND_CORDS = { lon: 16.003, lat: 50.009 }; //54 22
export function getRandomVovoideship() {
   return {
      lat: WARSAW_CORDS.lat + Math.random() * 10,
      lon: WARSAW_CORDS.lon + Math.random() * 10
   }
}
export function getRandomCountry() {
   return {
      lat: POLAND_CORDS.lat + Math.random() * 40,
      lon: POLAND_CORDS.lon + Math.random() * 40
   }
}