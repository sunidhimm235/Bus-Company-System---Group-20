require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 4000;

const { logger } = require('./backend/middleware/logger');
const errorHandler = require('./backend/middleware/errorHandler');
const corsOptions = require('./backend/config/corsOptions');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Connected to MongoDB');
    } 
    
    catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/users', require('./backend/routes/userRoutes'));
app.use('/auth', require('./backend/routes/auth')); 
app.use('/buses', require('./backend/routes/busRoutes'));
app.use('/api/travel-history', require('./backend/routes/travelHistoryRoutes'));
app.use('/api/reservations', require('./backend/routes/reservationRoutes'));

app.all('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

app.use(errorHandler);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});