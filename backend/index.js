const express = require("express");
const cors = require("cors")
const env = require("./config/envConfig");
const connect = require("./config/db");
const userRoutes = require("./routes/user.route");
const brandRoutes = require("./routes/brand.route");
const modelRoutes = require("./routes/model.route");
const app = express();

//database connection
connect();
app.use(cors())
//add middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ msg: "Welcome to autoparts" });
});
//user routes
app.use("/api/user", userRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/model", modelRoutes);

const port = env.PORT || 3000;

app.listen(port, () => {
    console.log("Port - " + port);
});
