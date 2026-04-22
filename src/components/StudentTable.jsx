import { useState } from "react";
import StudentRow from "./StudentRow";

export default function StudentTable({ students, onUpdateScore, onClearAll }) {
    const [search, setSearch] = useState("");

    const filtered = students.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="panel">
            <div className="panel-head">
                <span className="panel-title">All Students</span>
                <span className="count-pill">{students.length} students</span>
            </div>

            <div className="search-wrap">
                <div className="search-group">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button 
                            onClick={() => setSearch("")} 
                            className="save-btn clear-btn"
                        >
                            Clear
                        </button>
                    )}
                </div>
                {students.length > 0 && (
                    <button 
                        onClick={onClearAll} 
                        className="remove-all-btn"
                    >
                        Remove All
                    </button>
                )}
            </div>

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Score</th>
                            <th style={{ textAlign: "center" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((s) => (
                            <StudentRow key={s.id} student={s} onUpdateScore={onUpdateScore} />
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="empty">
                        <div className="empty-icon">◌</div>
                        No students found
                    </div>
                )}
            </div>
        </div>
    );
}