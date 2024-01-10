const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const app = express()

// require('dotenv').config()
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: ".env",
    });
  }

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors({
    origin: ['http://finance.inc.valid.co.ke',],
    credentials: true
  }));
// app.use("/", (req, res) => {
//     res.send("Hello world!");
// });

const amountRoutes = require('./routes/amount');
const accountRoutes = require('./routes/account');
// const accountsRoutes = require('./routes/account');

app.use('/api/v1/amount', amountRoutes);
app.use('/api/v1/account', accountRoutes);

// app.use('/api/v1/accounts', accountsRoutes);

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()