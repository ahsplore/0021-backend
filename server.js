const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const leaveRoutes = require("./routes/leaveRoutes");
const path = require("path");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.use("/api", leaveRoutes);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
