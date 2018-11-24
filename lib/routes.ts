import {Request, Response, NextFunction} from "express";
import {calculateProgress} from "./helpers/ProgressCalculate";

export class Routes {

    public routes({app, db}): void {

        app.route('/bets')
            .get((req: Request, res: Response) => {
                const response = {
                    progress: {
                        country: calculateProgress(db.bet, Area.COUNTRY, 1000),
                        voivodeship: calculateProgress(db.bet, Area.VOIVODESHIP, 200)
                    },
                    bets: db.bets,
                    results: db.results,
                    user : req.query.userId ? db.users.find((user : User) => user.userId === req.query.userId) : null
                };
                res.status(200).json(response);
            })
            .post((req: Request, res: Response, next: NextFunction) => {
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