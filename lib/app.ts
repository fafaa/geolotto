import * as express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes";

class App {

    public db: Database;
    public app: express.Application;
    public routes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.configDB();
        this.routes.routes(this.app);
    }

    private configDB(): void {
        this.db = {
            users: [],
            bets: [],
            betsArchive: []
        };
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static('public'));
    }

}

export default new App().app;