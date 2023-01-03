const express = require('express');
const cors = require('../middlewares/cors');
const session = require('../middlewares/session');

module.exports = (app) => {
    app.use(express.json());
    app.use(cors());
    //todo trimBody
    //todo test all forms again!!!!
    app.use(session());
}