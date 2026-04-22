import { useState } from "react";

const COLORS = [
    ["#7c6af720", "#a899ff"],
    ["#22d17a20", "#22d17a"],
    ["#f0614a20", "#f0614a"],
    ["#3b9eff20", "#6bbfff"],
    ["#ffb84020", "#ffb840"],
    ["#e05cef20", "#e05cef"],
    ["#4dd9ac20", "#4dd9ac"],
    ["#ff7eb320", "#ff7eb3"],
];

function getInitials(name) {
    return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function StudentRow({ student, onUpdateScore }) {
    const [inputScore, setInputScore] = useState(student.score);
    const [saved, setSaved] = useState(false);

    const [bg, fg] = COLORS[(student.id - 1) % COLORS.length];
    const isPassing = student.score >= 40;
    const pct = Math.min(100, student.score);

    const handleSave = () => {
        const clamped = Math.max(0, Math.min(100, parseInt(inputScore) || 0));
        onUpdateScore(student.id, clamped);
        setInputScore(clamped);
        setSaved(true);
        setTimeout(() => setSaved(false), 1200);
    };

    return (
        <tr className="student-row">
            <td>
                <div className="student-name">
                    <div className="avatar" style={{ background: bg, color: fg }}>
                        {getInitials(student.name)}
                    </div>
                    {student.name}
                </div>
            </td>
            <td>
                <div className="score-cell">
                    <div>
                        <input
                            className="score-input"
                            type="number"
                            min="0"
                            max="100"
                            value={inputScore}
                            onChange={(e) => setInputScore(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSave()}
                        />
                        <div className="score-bar">
                            <div
                                className="score-fill"
                                style={{
                                    width: `${pct}%`,
                                    background: isPassing ? "#22d17a" : "#f0614a",
                                }}
                            />
                        </div>
                    </div>
                    <button className={`save-btn${saved ? " saved" : ""}`} onClick={handleSave}>
                        {saved ? "Saved!" : "Save"}
                    </button>
                </div>
            </td>
            <td className="status-col">
                <span className={`status-badge ${isPassing ? "pass-badge" : "fail-badge"}`}>
                    <span className="dot" />
                    {isPassing ? "Pass" : "Fail"}
                </span>
            </td>
        </tr>
    );
}