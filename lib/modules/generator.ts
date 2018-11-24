import { Area } from "../interfaces/Area";
import { calculateProgress, getRandomCountry, getRandomWarsaw  } from "../helpers/ProgressCalculate";

export function startSimulation({ db }) {
   const progress = calculateProgress(db.bets, Area.COUNTRY, 100);
   if (progress < 0.1) {
      generateBet({ db });
      return setTimeout(() => startSimulation({ db }), 1000);
   }
   
}
export function simulateBetting({ db }) {
   
}

export function generateBet({ db }) {
   const area = Math.random() > 0.5 ? Area.COUNTRY : Area.VOIVODESHIP;
   const position = area === Area.VOIVODESHIP ? getRandomWarsaw() : getRandomCountry();
   const newBet = {
      id: 'id',
      position,
      userId: 'userId',
      rangeFactor: Math.random() * 10,
      distanceFactor: Math.random(),
      area
   }
   console.log('generated', newBet);
   return db.bets.push(newBet);
}
