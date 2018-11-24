import { Area } from "../interfaces/Area";
import { getRandomCountry, getRandomVovoideship  } from "../helpers/ProgressCalculate";

export function startSimulation({ db }) {
   generateBet({ db });
   return setTimeout(() => startSimulation({ db }), 1000);
}

export function generateBet({ db }) {
   const area = Math.random() > 0.5 ? Area.COUNTRY : Area.VOIVODESHIP;
   const position = area === Area.VOIVODESHIP ? getRandomVovoideship() : getRandomCountry();
   const newBet = {
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
      position,
      userId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
      rangeFactor: Math.random() * 20,
      distanceFactor: Math.random(),
      area
   }
   return db.bets.push(newBet);
}
