"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.app = express();
        this.config();
        this.configDB();
        this.routes.routes(this.app);
    }
    configDB() {
        this.db = {
            users: [],
            bets: [],
            betsArchive: []
        };
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static('public'));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map