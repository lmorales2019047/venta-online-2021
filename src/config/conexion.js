const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/db-venta-online", {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log("DB is connected"))
    .catch(err => console.error(err))