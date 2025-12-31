from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib

# -----------------------------
# Load trained model & encoder
# -----------------------------
model = joblib.load("disease_prediction_model.pkl")
label_encoder = joblib.load("disease_label_encoder.pkl")

# -----------------------------
# Extract feature info
# -----------------------------
preprocessor = model.named_steps["preprocessor"]

categorical_cols = list(preprocessor.transformers_[0][2])
numeric_cols = list(preprocessor.transformers_[1][2])

# 🔴 FORCE Outcome Variable to be categorical
if "Outcome Variable" in numeric_cols:
    numeric_cols.remove("Outcome Variable")
    categorical_cols.append("Outcome Variable")

ALL_COLUMNS = categorical_cols + numeric_cols

# -----------------------------
# Flask App
# -----------------------------
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "ML API is running (ALL inputs required)"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)

        # -----------------------------
        # 1. Check missing fields
        # -----------------------------
        missing_fields = [col for col in ALL_COLUMNS if col not in data]
        if missing_fields:
            return jsonify({
                "error": "Missing required input fields",
                "missing_fields": missing_fields
            }), 400

        # -----------------------------
        # 2. Build input row safely
        # -----------------------------
        sample = {}

        # Categorical
        for col in categorical_cols:
            sample[col] = str(data[col])

        # Numeric
        for col in numeric_cols:
            try:
                sample[col] = float(data[col])
            except:
                return jsonify({
                    "error": f"Invalid numeric value for column '{col}'"
                }), 400

        sample_df = pd.DataFrame([sample], columns=ALL_COLUMNS)

        # -----------------------------
        # 3. Predict
        # -----------------------------
        probs = model.predict_proba(sample_df)[0]
        top_idx = np.argsort(probs)[::-1][:3]

        result = [
            {
                "disease": label_encoder.inverse_transform([i])[0],
                "probability": float(probs[i])
            }
            for i in top_idx
        ]

        return jsonify({"top_predictions": result})

    except Exception as e:
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500


# -----------------------------
# Run Flask server
# -----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
