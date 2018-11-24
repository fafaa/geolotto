import * as express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes";

class App {

    public db: any;
    public app: express.Application;
    public routes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();

        this.routes.routes(this.app);
    }

    private configDB(): void {
        this.db = {};
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static('public'));
    }

}

export default new App().app;