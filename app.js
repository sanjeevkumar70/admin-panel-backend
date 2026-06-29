const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI).then().catch();

app.get('/',  (req, res) => {
    return res.json("Hello backend ...");
});

app.use("/auth", require("./routes/auth.routes"));
app.use("/api", require("./routes/user.routes")); 
app.use("/api", require("./routes/category-blog.routes")); 


module.exports = app;

app.listen(5000, () => {
    console.log('running in 5000')
});