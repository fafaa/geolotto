import {Request, Response, NextFunction} from "express";

export class Routes {

    public routes(app): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).json({
                    message: 'GET request successfulll!!!!'
                })
            })

    }
}