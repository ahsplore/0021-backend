const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Failed:", err));

const schema = new mongoose.Schema({
    employeeName: String,
    leaveType: { type: String, enum: ["Casual Leave", "Medical Leave"] },
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
});

const Leave = mongoose.model("Leave", schema);

app.post("/apply", async (req, res) => {
    try {
        const leave = new Leave(req.body);
        await leave.save();
        res.status(201).json({ message: "Leave applied successfully!" });
    } catch (error) {
        res.status(500).json({ error: "error applying leave" });
    }
});

app.get("/leaves", async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ error: "error getting data" });
    }
});

app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
