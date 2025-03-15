import { useState, useEffect } from "react";
import "./index.css";

const API_URL = "http://localhost:5000";

function Leave() {
    const [employeeName, setEmployeeName] = useState("");
    const [leaveType, setLeaveType] = useState("Casual Leave");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/leaves`)
            .then(res => res.json())
            .then(data => setLeaves(data))
            .catch(err => console.error("Error fetching leaves:", err));
    }, []);

    const applyLeave = async (e) => {
        e.preventDefault();
        const leaveData = { employeeName, leaveType, startDate, endDate };

        try {
            const res = await fetch(`${API_URL}/apply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leaveData),
            });
            if (res.ok) {
                alert("Leave applied successfully!");
                setLeaves([...leaves, leaveData]);
            } else {
                alert("Error applying leave.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const calculateDays = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        const dayleft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

        if (dayleft > 0) return `${dayleft} day(s) left`;
        if (dayleft === 0) return `Last day today`;
        return `Leave ended ${Math.abs(dayleft)} day(s) ago`;
    };

    return (
        <div className="container">
            <h1>Leave Management System</h1>
            <form onSubmit={applyLeave}>
                <input type="text" placeholder="Employee Name" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} required />
                <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Medical Leave">Medical Leave</option>
                </select>

                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

                <button type="submit">Apply for Leave</button>
            </form>

            <h2>Applied Leaves</h2>
            <ul>
                {leaves.map((leave, index) => (
                    <li key={index}>
                        <b>{leave.employeeName}</b> - {leave.leaveType} ({leave.startDate} to {leave.endDate}) 
                        <br />
                        <span className="status">{calculateDays(leave.endDate)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Leave;
