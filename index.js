const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const authRouter = require('./route/authrouter');
const postRouter = require('./route/postrouter');

app.use('/', authRouter);
app.use('/post', postRouter);

app.listen(process.env.PORT, async (req, res) => {
    console.log(`server running on port ${process.env.PORT}`);
})
