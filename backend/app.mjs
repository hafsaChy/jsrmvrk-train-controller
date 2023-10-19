import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import fetchTrainPositions from './models/trains.mjs';
import delayed from './routes/delayed.mjs';
import tickets from './routes/tickets.mjs';
import codes from './routes/codes.mjs';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const httpServer = createServer(app); // Create the HTTP server instance

app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const port = 1337;

app.get('/', (req, res) => {
  res.json({
    data: 'Hello World!'
  });
});

app.use('/delayed', delayed);
app.use('/tickets', tickets);
app.use('/codes', codes);

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

fetchTrainPositions(io);






// // require('dotenv').config()
// import dotenv from 'dotenv';
// dotenv.config();

// // const express = require('express')
// // const cors = require('cors')
// // const morgan = require('morgan')
// // const bodyParser = require('body-parser')
// import express from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
// import bodyParser from 'body-parser';

// // const fetchTrainPositions = require('./models/trains.js')
// // const delayed = require('./routes/delayed.js');
// // const tickets = require('./routes/tickets.js');
// // const codes = require('./routes/codes.js');

// // const app = express()
// // const httpServer = require("http").createServer(app);

// import fetchTrainPositions from './models/trains.mjs'
// import delayed from './routes/delayed.mjs';
// import tickets from './routes/tickets.mjs';
// import codes from './routes/codes.mjs';
// import { createServer } from 'http';
// import { Server } from 'socket.io'; 

// const app = express()
// import httpServer from 'http'
// httpServer.createServer(app);

// app.use(cors());
// app.options('*', cors());

// app.disable('x-powered-by');

// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// // const io = require("socket.io")(httpServer, {
// //   cors: {
// //     origin: "http://localhost:9000",
// //     methods: ["GET", "POST"]
// //   }
// // });
// const io = new Server(httpServer, {
//   cors: {
//     origin: 'http://localhost:9000',
//     methods: ['GET', 'POST'],
//   },

// });

// const port = 1337

// app.get('/', (req, res) => {
//   res.json({
//       data: 'Hello World!'
//   })
// })

// app.use("/delayed", delayed);
// app.use("/tickets", tickets);
// app.use("/codes", codes);

// httpServer.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// fetchTrainPositions(io);
