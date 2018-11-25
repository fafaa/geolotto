import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import {Routes} from "./routes";
import {CONFIG} from "./config";
import {Database} from "./interfaces/Database";
import {generateMultipleBets, startSimulation} from "./modules/generator";
import {calculateLottery} from "./helpers/LotteryCalculate";

class App {

    public db: Database;
    public app: express.Application;
    public config: any;
    public routes: Routes = new Routes();

    public intervalLottery: NodeJS.Timeout;

    constructor() {
        this.app = express();
        this.config = CONFIG;
        this.configApp();
        this.configDB();
        this.runLotteryInterval();
        this.routes.routes(this);
        startSimulation(this.db);
        generateMultipleBets(this.db, 500);
    }

    private configDB(): void {
        this.db = {
            users: [{
                userId: '1',
                balance: 100,
                bets: [],
                email: 'eryk.zimonczyk@gmail.com',
                name: 'Eryk Zimonczyk'
            },
                {
                    userId: '2',
                    balance: 400,
                    bets: [],
                    email: 'jannowak@gmail.com',
                    name: 'Jan Nowak'
                }],
            bets: [],
            betsArchive: [],
            results: []
        };
    }

    private runLotteryInterval() {
        this.intervalLottery = setInterval(() => {
            calculateLottery(this.db, this.config);
        }, 100);
    }

    private configApp(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        // serving static files
        this.app.use(express.static('public'));
    }

}

export default new App().app;