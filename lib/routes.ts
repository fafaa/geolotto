import {Request, Response} from "express";
import {calculateProgress} from "./helpers/ProgressCalculate";
import {Area} from './interfaces/Area';
import {Bet} from "./interfaces/Bet";

export class Routes {

    public routes({app, db, config}): void {
        app.route('/results')
            .get((req: Request, res: Response) => {
                const response = {
                    results: db.results,
                };
                res.status(200).json(response);
            });
        app.route('/account')
            .get((req: Request, res: Response) => {
                if(req.query.userId){
                    const userWins = db.results.reduce((acc, result) => {
                        const resultWins = result.winners.filter((winner) => {
                            return winner.userId == req.query.userId.toString();
                        });
                        acc.concat(resultWins);
                        return acc;
                    }, []);


                    const userCurrentBets = db.bets.filter((bet:Bet) => {
                        return bet.userId == req.query.userId;
                    });
                    const userArchiveBets = db.betsArchive.filter((bet:Bet) => {
                        const p = userWins.find((win) => win.betId === bet.id);
                        bet.prize = p ? p.prize : null;
                        return bet.userId === req.query.userId;
                    });
                    res.status(200).json({
                        userWins,
                        userCurrentBets,
                        userArchiveBets,
                        user: db.users.find((user) => user.userId == req.query.userId)
                    });
                }
                res.status(404).json({
                    err: 'No user found'
                });
            });
        // lists all bet
        app.route('/bets')
            .get((req: Request, res: Response) => {
                const response = {
                    progress: {
                        country: calculateProgress(db.bets, Area.COUNTRY, config.COUNTRY_LIMIT),
                        voivodeship: calculateProgress(db.bets, Area.VOIVODESHIP, config.VOIVODESHIP_LIMIT)
                    },
                    bets: db.bets,
                    results: db.results,
                    user: req.query.userId ? db.users.find((user: User) => user.userId === req.query.userId) : null
                };
                res.status(200).json(response);
            });
        
        // adding new bet
        app.route('/bet')
            .post((req: Request, res: Response) => {
                try {
                    const {userId, position, friendBetId, distanceFactor, area} = req.body;
                    // create new bet
                    const id:string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
                    const newBet: Bet = {
                        id: id,
                        distanceFactor: distanceFactor,
                        position: {
                            lat: position.lat,
                            lon: position.lon
                        },
                        rangeFactor: 10,
                        userId: userId,
                        area
                    };
                    // update balance
                    db.users = db.users.map((user: User) => {
                        if (user.userId === userId) {
                            user.balance = user.balance - config.COUPON_PRICE;
                            user.bets.push(newBet.id)
                        }
                        return user;
                    });
                    // update user bet from reflink
                    if (friendBetId) {
                        db.bets = db.bets.map((bet: Bet) => {
                            if (bet.id == friendBetId) {
                                bet.distanceFactor = bet.distanceFactor + config.FRIEND_DISTANCE_ADD
                            }
                            return bet;
                        })
                    }
                    db.bets.push(newBet);
                    res.status(200).json({
                        bet: newBet
                    });

                } catch (e) {
                    res.status(401).json({
                        err: 'Failed to add bet'
                    });
                }
            });
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).json({
                    message: 'API works'
                })
            })
    }
}