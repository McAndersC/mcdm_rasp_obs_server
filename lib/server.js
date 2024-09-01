// Server Module.

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'node:http';
import indexRouter from './routes/index.js';
import { Server } from 'socket.io';


const expressServer = express();
const server = createServer(expressServer);
const io = new Server(server,{
  cors: {
    origin: "*",
  }
});


// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));

// Cross Origin Resource Sharing
expressServer.use(cors());

// Serve static files from the public and www directories.
expressServer.use(express.static('public'));
expressServer.use(express.static('www'));

// Index Client Frontend Route
expressServer.use(indexRouter);

// const io = new Server(expressServer);
// Run the server.
server.run = () => {

    console.log('\n\n---------------------');
    console.log('Starter Server ->', process.env.NODE_ENV, process.env.SERVER_HOST);
    console.log('\n\n---------------------');

    server.listen(process.env.SERVER_PORT, () =>
      console.log(`Serveren lytter på port ${process.env.SERVER_PORT}`)
    );

    // Manage socket connections.
    io.on('connection', (socket) => {
      
      console.log('A client connected');

      // Her lytter vi på en besked fra klienten
      socket.on('clientMessage', (data) => {

        console.log('Client Message:', data); 

        // Her emitter vi tilbage til alle klienter
        io.emit('post', data);

      });

    });
    
};





// Export the server.
export default server;


