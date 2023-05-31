const cors = require('cors');
const express = require('express');

const bodyParser = require('body-parser');
const userRouter = require('./routes/authRoutes');

// dotenv config
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

require('./config/db');
// Mongodb connection
// connectEb()
// rest object
const app = express();
app.use(
    cors({
      // origin: ['http://localhost:3000'],
      // methods: ['GET', 'POST','PUT', 'PATCH', 'DELETE'],
      // credentials: true,
    }),
  );
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
// app.use(morgan('dev'));
// routes
app.use('/', userRouter);
// port
const port = process.env.PORT || 8080;

// listen port
app.listen(port, () => {
  console.log(
    `Server Running is${process.env.NODE_MODE} mode on port ${process.env.PORT}`
   
  );
});