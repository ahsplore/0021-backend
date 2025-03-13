const express = require("express");
const router = express.Router();
const Leave = require("../models/leave");
router.post("/apply", async (req, res) => {
    try {
        const { employeeName, leaveType, startDate, endDate } = req.body;

        const leave = new Leave({ employeeName, leaveType, startDate, endDate });
        await leave.save();
        res.status(201).send("Leave applied successfully!");
    } catch (error) {
        res.status(500).json({ error: "Error applying leave" });
    }
});
router.get("/leaves", async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ error: "Error fetching leave data" });
    }
});

module.exports = router;
