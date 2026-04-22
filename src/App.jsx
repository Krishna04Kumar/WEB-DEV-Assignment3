import { useState } from "react";
import Header from "./components/Header";
import StudentTable from "./components/StudentTable";
import AddStudentForm from "./components/AddStudentForm";
import "./App.css";

const initialStudents = [
  { id: 1, name: "Aarav Mehta", score: 82 },
  { id: 2, name: "Priya Sharma", score: 35 },
  { id: 3, name: "Rohan Gupta", score: 67 },
  { id: 4, name: "Diya Patel", score: 91 },
  { id: 5, name: "Kabir Singh", score: 28 },
  { id: 6, name: "Ananya Nair", score: 54 },
];

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [nextId, setNextId] = useState(7);

  const addStudent = (name, score) => {
    setStudents((prev) => [...prev, { id: nextId, name, score }]);
    setNextId((id) => id + 1);
  };

  const updateScore = (id, newScore) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: newScore } : s))
    );
  };

  const clearStudents = () => {
    setStudents([]);
  };


  const total = students.length;
  const passed = students.filter((s) => s.score >= 40).length;
  const failed = total - passed;
  const avg = total
    ? Math.round(students.reduce((a, s) => a + s.score, 0) / total)
    : 0;

  return (
    <div className="app">
      <Header />

      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-label">Total</span>
          <span className="stat-value accent">{total}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Passed</span>
          <span className="stat-value pass">{passed}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Failed</span>
          <span className="stat-value fail">{failed}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Avg Score</span>
          <span className="stat-value">{avg}</span>
        </div>
      </div>

      <div className="main">
        <StudentTable students={students} onUpdateScore={updateScore} onClearAll={clearStudents} />
        <AddStudentForm onAdd={addStudent} />
      </div>
    </div>
  );
}