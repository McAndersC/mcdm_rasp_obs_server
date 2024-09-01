import * as dotenv from "dotenv";

dotenv.config({ path: `.env.local`, override: true })

import server from './lib/server.js';

const application = {}

// Vi initialiserer vores applikation.
application.init = () => {

    // Vi kalder run metoden på vores server module.
    server.run();

}

// console.log(process.env)

// Vi Starter vores applikation. "Self executing function" style.
application.init();