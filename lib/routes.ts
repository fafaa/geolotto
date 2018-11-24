import {Request, Response, NextFunction} from "express";

export class Routes {

    public routes(app): void {


        app.route('/bets')
            .get((req: Request, res: Response) => {
                const response = {
                    progress: {
                        country: 0.1,
                        voivodeship: 0.3
                    },
                    bets: app.db.bets,
                    results: app.db.results,
                    user : req.params.userId ? app.db.users.find((user : User) => user.userId === req.params.userId) : null
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