const express = require('express')
const router = express.Router();
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

router.get('/', (req, res) => res.status(200).json({status: 'Application Version 1'}));

app.use('/api', router);
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
