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