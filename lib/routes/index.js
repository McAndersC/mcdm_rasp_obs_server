import express from 'express';
import * as path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);

const indexRouter = express.Router();

// About page route.
indexRouter.get("/", (req, res) => {
  
    res.sendFile(path.join(__dirname, '../../www/index.html'));

});

export default indexRouter;