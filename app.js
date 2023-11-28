const express = require('express');
const bodyPaser = require('body-parser');
const bcrpt = require('bcrypt');
const session = require('express-session');
const hbs = require('express-handlebars');

const app  = express();
app.use(express.json());









const PORT = process.env.PORT || 5200;
app.listen(PORT, console.log(`app running at port ${PORT}`));