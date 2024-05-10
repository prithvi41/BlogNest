const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();

app.listen(process.env.PORT, async (req, res) => {
    console.log(`server running on port ${process.env.PORT}`);
})
