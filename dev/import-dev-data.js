const fs = require('fs');
const mongoose = require('mongoose');
const Stores = require('../src/models/stores.model');
const dotenv = require('dotenv');

mongoose.connect(process.env.DB_URL).then(() => console.log('test'));
