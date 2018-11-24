"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).json({
                message: 'GET request successfulll!!!!'
            });
        });
        /*
                // Contact
                app.route('/contact')
                    .get((req: Request, res: Response, next: NextFunction) => {
                        // middleware
                        console.log(`Request from: ${req.originalUrl}`);
                        console.log(`Request type: ${req.method}`);
                        if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
                            res.status(401).send('You shall not pass!');
                        } else {
                            next();
                        }
                    }, this.contactController.getContacts)

                    // POST endpoint
                    .post(this.contactController.addNewContact);

                // Contact detail
                app.route('/contact/:contactId')
                // get specific contact
                    .get(this.contactController.getContactWithID)
                    .put(this.contactController.updateContact)
                    .delete(this.contactController.deleteContact)
        */
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map