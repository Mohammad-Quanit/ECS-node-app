const express = require('express')
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use('/', (req, res) => res.status(200).json({status: 'Application Version 1'}));
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
