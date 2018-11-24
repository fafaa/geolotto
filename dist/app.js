"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
class App {
    //public routes: Routes = new Routes();
    constructor() {
        this.app = express();
        this.config();
        // this.routes.routes(this.app);
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