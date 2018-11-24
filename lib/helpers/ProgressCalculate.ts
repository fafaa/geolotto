import {Area} from "../interfaces/Area";
import {Bet} from "../interfaces/Bet";
import { CONFIG } from '../config';
const { WARSAW_CORDS, POLAND_CORDS } = CONFIG;
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

export function getRandomVovoideship() {
   return {
    lat: WARSAW_CORDS.latStart + Math.random() * (WARSAW_CORDS.latEnd - WARSAW_CORDS.latStart),
    lon: WARSAW_CORDS.lonStart + Math.random() * (WARSAW_CORDS.lonEnd - WARSAW_CORDS.lonStart),
   }
}
export function getRandomCountry() {
   return {
      lat: POLAND_CORDS.latStart + Math.random() * (POLAND_CORDS.latEnd - POLAND_CORDS.latStart),
      lon: POLAND_CORDS.lonStart + Math.random() * (POLAND_CORDS.lonEnd - POLAND_CORDS.lonStart),
   }
}