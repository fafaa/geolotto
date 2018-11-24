import * as express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes";
import {CONFIG} from "./config";
import {Database} from "./interfaces/Database";
import { startSimulation } from "./modules/generator";

class App {

    public db: Database;
    public app: express.Application;
    public config: any;
    public routes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config = CONFIG;
        this.configApp();
        this.configDB();
        this.routes.routes(this);
        startSimulation(this);
    }

    private configDB(): void {
        this.db = {
            users: [],
            bets: [],
            betsArchive: [],
            results: []
        };
    }

    private simulateTraffic(){

    }

    private configApp(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static('public'));
    }

}

export default new App().app;