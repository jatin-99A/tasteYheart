// create server
const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.route');
const cors = require('cors');
const deliveryPartnerRoutes = require('./routes/deliveryPartner.route');
const vendorRoutes = require('./routes/vendor.route');
const { errorHandler } = require('./middlewares/errorHandler.middleware');


const app = express();

// using middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// using routes
app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api/user', userRoutes);
app.use('/api/delivery-partner', deliveryPartnerRoutes);
app.use('/api/vendor', vendorRoutes);

// using error handler middleware
app.use(errorHandler);
module.exports = app;