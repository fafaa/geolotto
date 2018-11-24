import { Area } from "../interfaces/Area";
import { getRandomCountry, getRandomVovoideship  } from "../helpers/ProgressCalculate";
import { Database } from "../interfaces/Database";
import { CONFIG } from '../config';

export function generateMultipleBets(db: Database, quantity: number, betData = {}) {
   for (let i = 0; i < quantity; i++) {
      generateBet(betData);
   }
}

export function startSimulation(db: Database) {
   db.bets.push(generateBet());
   return setTimeout(() => startSimulation(db), CONFIG.GENERATOR_INTERVAL);
}

export function generateBet(betData: any = {}) {
   const area = Math.random() > 0.5 ? Area.COUNTRY : Area.VOIVODESHIP;
   const position = area === Area.VOIVODESHIP ? getRandomVovoideship() : getRandomCountry();
   const id = (Math.random() * 10).toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
   const newBet = {
      id,
      position,
      userId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
      rangeFactor: Math.floor((Math.random() * 30 + 1)),
      distanceFactor: Math.random(),
      area,
      ...betData
   }
   return newBet;
}
