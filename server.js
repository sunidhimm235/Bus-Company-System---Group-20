require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const { logger } = require('./backend/middleware/logger');
const errorHandler = require('./backend/middleware/errorHandler');
const corsOptions = require('./backend/config/corsOptions');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
};

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client', 'public')));

app.use('/users', require('./backend/routes/userRoutes'));
app.use('/auth', require('./backend/routes/auth'));
app.use('/buses', require('./backend/routes/busRoutes'));

app.all('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

app.use(errorHandler);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});