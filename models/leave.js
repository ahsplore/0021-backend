const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
    employeeName: { type: String, required: true },
    leaveType: { type: String, enum: ["Casual Leave", "Medical Leave"], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
});

module.exports = mongoose.model("Leave", LeaveSchema);
