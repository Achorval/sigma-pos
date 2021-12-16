require("dotenv").config({path:__dirname+'/./.env'});

module.exports = parseInt(process.env.PORT, 10);