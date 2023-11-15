const express = require("express");
const env = require("./config/envConfig");
const connect = require("./config/db");
const userRoutes = require("./routes/users/userRoutes");
const app = express();

//database connection 
connect();

//add middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ msg: "Welcome to autoparts" });
});
//user routes
app.use("/api", userRoutes);

const port = env.PORT || 3000;

app.listen(port, () => {
    console.log("Port - " + port);
});