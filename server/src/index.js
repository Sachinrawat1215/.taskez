const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const Connection = require('./db/conn');
const dotEnv = require('dotenv');
const router = require('./Routes/route');
const cors = require('cors');

dotEnv.config();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

Connection(process.env.MONGODB_URI);

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
});