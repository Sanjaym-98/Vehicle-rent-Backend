const express = require('express');
const app = express();
const connection = require('./Connection/connection');
connection();
const vehicleroutes = require('./Routes/routes');
const cors = require('cors');
app.use(cors())

app.use("/api/v1/", vehicleroutes);

app.get("*", (req, res) => {
    res.status(404).send("This is a not a proper request");
})

app.listen(5500, () => {
    console.log("server is up at 5500");

});