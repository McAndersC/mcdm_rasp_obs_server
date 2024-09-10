// Server Module.

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'node:http';
import five from 'johnny-five';
import indexRouter from './routes/index.js';
import { Server } from 'socket.io';
import { createClientInformation } from './handlers/client.handler.js';
import * as path from 'path';
import * as url from 'url';
import { set } from 'mongoose';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);

const expressServer = express();
const server = createServer(expressServer);
const io = new Server(server,{
  cors: {
    origin: "*",
  }
});

const board = new five.Board({port : process.env.ARDUINO_PORT});

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));

// Cross Origin Resource Sharing
expressServer.use(cors());

// Serve static files from the public and www directories.
expressServer.use(express.static('public'));
expressServer.use(express.static('www'));


// Use the index router.
expressServer.use(express.static(path.join(__dirname, "..", "dist")));

// Serve the index.html from the dist folder.
expressServer.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

export const devices = {};
let setttings = {
  boardReady : false
};
board.on("ready", () => {

  console.log('Board Ready - Setting up devices through Jhonny-five.');

  devices.rled = new five.Led(9);
  devices.gled = new five.Led(10);
  devices.bled = new five.Led(11);
  devices.button = new five.Button(2);
  devices.photoresistor = new five.Sensor({
    pin: "A2",
    freq: 250
  });
  setttings.boardReady = true;
  
  io.emit('boardReady', {message: 'Board is ready!'});
});



// Index Client Frontend Route
// expressServer.use(indexRouter);

// const io = new Server(expressServer);
// Run the server.
server.run = () => {

    console.log('\n\n---------------------');
    console.log('Starter Server ->', process.env.NODE_ENV, process.env.SERVER_HOST);
    console.log('Arduinoboard Server ->', process.env.ARDUINO_PORT);
    console.log('Mongo Connetcion ->', process.env.MONGODB_URI);
    console.log('\n\n---------------------');

    server.listen(process.env.SERVER_PORT, () =>
      console.log(`Serveren lytter på port ${process.env.SERVER_PORT}`)
    );

    

    
};

let mySocket = null;
// Manage socket connections.
io.on('connection', (socket) => {

    if(setttings.boardReady) {
      console.log('A client connected', setttings.boardReady);
      socket.emit('sendinfo');
    }

    setInterval(() => {
      console.log('TJEK');
      socket.emit('areyoualive', {message: 'Are you alive?'});
    }, 10000);

    // Her lytter vi på en besked fra klienten
    socket.on('clientInit', async (data) => {
      data = JSON.parse(data);
      console.log(data)

     
      switch (data.name) {
        case 'RED':
            devices.rled.on();  
          break;
        case 'GREEN':
            devices.gled.on();  
          break; 
        case 'BLUE':
            devices.bled.on();  
          break;       
        default:
          break;
      }

      
      createClientInformation(data);
      
      socket.on('iamalive', async (data) => {

        console.log('I Am Alive', data);

      });



   
      
    });     

});


// Export the server.
export default server;


