const express = require('express');
const logger = require('./logger');
const port = require('./port');
const {sequelize} = require('./models');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var cors = require('cors');
var multer = require('multer');
var upload = multer();
var fileUpload = require('express-fileupload')

const app = express();
app.use(express.json());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

//API ROUTES
require('./routes')(app);

const customHost = process.env.HOST;
const host = customHost || null; 
const prettyHost = customHost || 'localhost';

// Start your app.
sequelize.sync()
    .then(() => {
        app.listen(port, host, async err => {
            if (err) {
                return logger.error(err.message);
            }
            
            logger.appStarted(port, prettyHost);
            
        });
    console.log(`Server started on port ${port}`);
});

