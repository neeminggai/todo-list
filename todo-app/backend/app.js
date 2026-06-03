// backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Allow any localhost port in development (handles cases where React starts on :3001, :3002, etc.)
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options(/(.*)/, cors(corsOptions)); // handle preflight for all routes (Express 5 requires regex, not '*')


app.use(bodyParser.json());
app.use(express.json());

// ===== Import Routes =====
const authRoute = require('./routes/authRoute');
const todoRoute = require('./routes/secure/todoRoute');

authRoute(app);
todoRoute(app);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});