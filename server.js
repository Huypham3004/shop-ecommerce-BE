const express = require('express');
const app = express(); 

const routes = require('./routes.config');

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});

// ADD THIS
var cors = require('cors');
app.use(cors());

app.use(express.json());

// app.use((req, res, next) => {
//     console.log("first middleware");
//     next();
// })

routes.routesConfig(app); 


app.listen(4000, function () {
    console.log('app listening at port %s', 4000);
});
