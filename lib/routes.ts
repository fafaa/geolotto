import {Request, Response, NextFunction} from "express";
import {calculateProgress} from "./helpers/ProgressCalculate";
import {Area} from './interfaces/Area';

export class Routes {

    public routes({app, db, config}): void {

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
            })
            .post((req: Request, res: Response) => {
                res.status(200).json({});
            });


        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).json({
                    message: 'API works'
                })
            })
    }
}