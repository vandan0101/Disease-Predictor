import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaVenusMars,
  FaThermometerHalf,
  FaLungs,
  FaTired,
  FaHeartbeat,
  FaProcedures,
  FaVial,
  FaCheckCircle
} from "react-icons/fa";

function App() {
  const [formData, setFormData] = useState({
    Age: 30,
    Gender: "Male",
    Fever: "Low",
    Cough: "Low",
    Fatigue: "Low",
    "Difficulty Breathing": "Low",
    "Blood Pressure": 120,
    "Cholesterol Level": 180,
    "Outcome Variable": "No"
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/predict",
        formData
      );
      setResult(response.data.top_predictions);
    } catch (err) {
      setError("Prediction failed. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🩺 Smart Disease Predictor</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <Input icon={<FaUser />} label="Age" type="number" name="Age" value={formData.Age} onChange={handleChange} />
          <Select icon={<FaVenusMars />} label="Gender" name="Gender" value={formData.Gender} onChange={handleChange} options={["Male", "Female"]} />
          <Select icon={<FaThermometerHalf />} label="Fever" name="Fever" value={formData.Fever} onChange={handleChange} options={["Low", "Medium", "High"]} />
          <Select icon={<FaLungs />} label="Cough" name="Cough" value={formData.Cough} onChange={handleChange} options={["Low", "Medium", "High"]} />
          <Select icon={<FaTired />} label="Fatigue" name="Fatigue" value={formData.Fatigue} onChange={handleChange} options={["Low", "Medium", "High"]} />
          <Select icon={<FaProcedures />} label="Difficulty Breathing" name="Difficulty Breathing" value={formData["Difficulty Breathing"]} onChange={handleChange} options={["Low", "Medium", "High"]} />
          <Input icon={<FaHeartbeat />} label="Blood Pressure" type="number" name="Blood Pressure" value={formData["Blood Pressure"]} onChange={handleChange} />
          <Input icon={<FaVial />} label="Cholesterol Level" type="number" name="Cholesterol Level" value={formData["Cholesterol Level"]} onChange={handleChange} />
          <Select icon={<FaCheckCircle />} label="Outcome Variable" name="Outcome Variable" value={formData["Outcome Variable"]} onChange={handleChange} options={["No", "Yes"]} />

          <button type="submit" style={styles.button}>
            {loading ? "Predicting..." : "Predict Disease"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        {result && (
          <div style={styles.result}>
            <h3>🔍 Prediction Result</h3>
            {result.map((item, index) => (
              <div key={index} style={styles.resultItem}>
                <strong>{item.disease}</strong>
                <span>{(item.probability * 100).toFixed(2)}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- REUSABLE INPUT COMPONENTS ---------- */

const Input = ({ icon, label, ...props }) => (
  <div style={styles.field}>
    <label>{icon} {label}</label>
    <input {...props} style={styles.input} />
  </div>
);

const Select = ({ icon, label, options, ...props }) => (
  <div style={styles.field}>
    <label>{icon} {label}</label>
    <select {...props} style={styles.input}>
      {options.map(opt => <option key={opt}>{opt}</option>)}
    </select>
  </div>
);

/* ---------- STYLES ---------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(120deg, #e3f2fd, #fce4ec)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "750px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: "25px"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px"
  },
  field: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    gridColumn: "span 2",
    marginTop: "20px",
    padding: "14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    background: "#1976d2",
    color: "#fff",
    cursor: "pointer"
  },
  result: {
    marginTop: "25px",
    padding: "15px",
    background: "#f1f8e9",
    borderRadius: "8px"
  },
  resultItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0"
  },
  error: {
    marginTop: "15px",
    color: "red",
    textAlign: "center"
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%"
  }
};

export default App;
