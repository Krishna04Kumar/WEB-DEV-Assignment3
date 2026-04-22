import { useState } from "react";

export default function AddStudentForm({ onAdd }) {
    const [name, setName] = useState("");
    const [score, setScore] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (!name.trim()) {
            setError("Please enter a student name.");
            return;
        }
        const s = Math.max(0, Math.min(100, parseInt(score) || 0));
        onAdd(name.trim(), s);
        setName("");
        setScore("");
        setError("");
    };

    const pct = Math.min(100, parseInt(score) || 0);
    const isPassing = pct >= 40;

    return (
        <div className="form-panel">
            <div className="panel-head">
                <span className="panel-title">Add Student</span>
            </div>
            <div className="form-body">
                <div className="form-group">
                    <label className="form-label" htmlFor="inp-name">Full Name</label>
                    <input
                        id="inp-name"
                        className={`form-input${error ? " input-error" : ""}`}
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && document.getElementById("inp-score").focus()}
                    />
                    {error && <p className="form-error">{error}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="inp-score">Score (0 – 100)</label>
                    <input
                        id="inp-score"
                        className="form-input"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="e.g. 78"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                    <div className="score-meter">
                        <div className="meter-label">
                            <span>0</span>
                            <span style={{ color: score ? (isPassing ? "#22d17a" : "#f0614a") : "var(--text3)" }}>
                                {score ? pct : "—"}
                            </span>
                            <span>100</span>
                        </div>
                        <div className="meter-track">
                            <div
                                className="meter-fill"
                                style={{
                                    width: score ? `${pct}%` : "0%",
                                    background: isPassing ? "#22d17a" : "#f0614a",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <button className="submit-btn" onClick={handleSubmit}>
                    + Add to Scoreboard
                </button>

                <div className="divider" />
                <div className="tip">
                    <b>Pass threshold:</b> 40 marks and above is a pass.
                    Scores update live in the table.
                </div>
            </div>
        </div>
    );
}