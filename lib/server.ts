import app from './app';
import * as https from 'https';
const PORT = 3000;

https.createServer({}, app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});