const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./lib/connection');
const userRoutes = require('./routes/router');

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', userRoutes);
app.get('/', (req, res) => {
    res.send('Welcome !!');
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});