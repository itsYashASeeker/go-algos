const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const retDP = require("../dirP");
var path = require("path");

const transporterV = nodemailer.createTransport({
    service: "yahoo",
    auth: {
        user: process.env.userE,
        pass: process.env.userP
    }
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

transporterV.use("compile", hbs(handlebarOptions));

module.exports = transporterV;