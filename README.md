# Disease Predictor
A comprehensive disease prediction system utilizing machine learning and a robust backend infrastructure.

## Header & Badges
[![Build Status](https://travis-ci.org/vandan0101/Disease-Predictor.svg?branch=master)](https://travis-ci.org/vandan0101/Disease-Predictor)
[![Coverage Status](https://coveralls.io/repos/github/vandan0101/Disease-Predictor/badge.svg?branch=master)](https://coveralls.io/github/vandan0101/Disease-Predictor?branch=master)
[![License](https://img.shields.io/github/license/vandan0101/Disease-Predictor)](https://github.com/vandan0101/Disease-Predictor/blob/master/LICENSE)
[![Version](https://img.shields.io/github/package-json/v/vandan0101/Disease-Predictor)](https://github.com/vandan0101/Disease-Predictor/blob/master/package.json)

## Overview
Disease Predictor is a cutting-edge system designed to predict diseases based on various factors. The project consists of a robust backend built with Node.js, Express.js, and MongoDB, and a frontend built with React.js. The system utilizes machine learning algorithms to make accurate predictions.

## Features
* **Disease Prediction**: The system can predict diseases based on user input.
* **User Authentication**: Users can register and log in to the system.
* **Data Visualization**: The system provides visualizations of the predicted data.
* **Machine Learning**: The system utilizes machine learning algorithms to make accurate predictions.

## Tech Stack
* **Backend**:
	+ Node.js
	+ Express.js
	+ MongoDB
* **Frontend**:
	+ React.js
* **Machine Learning**:
	+ Python
	+ Scikit-learn

## Architecture
The system consists of the following components:
* **Backend**: Handles user authentication, data storage, and machine learning tasks.
* **Frontend**: Handles user input, data visualization, and user interaction.
* **Machine Learning**: Handles disease prediction tasks.

## Project Structure
The project is structured as follows:
```markdown
Disease-Predictor/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── User.js
│   ├── node_modules/
│   │   ├── ...
│   ├── routes/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── AuthPage.css
│       ├── AuthPage.js
│       ├── PredictPage.js
│       ├── assets/
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── reportWebVitals.js
│       └── setupTests.js
├── ml_api/
│   ├── app.py
│   ├── disease_label_encoder.pkl
│   ├── disease_prediction_model.pkl
│   └── requirements.txt
├── newpredictor.ipynb
├── node_modules/
├── package-lock.json
└── package.json
```

## Getting Started
### Prerequisites
* Node.js (>= 14.17.0)
* Python (>= 3.8.0)
* MongoDB (>= 4.4.0)

### Installation
1. Clone the repository: `git clone https://github.com/vandan0101/Disease-Predictor.git`
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Install machine learning dependencies: `cd ml_api && pip install -r requirements.txt`

### Configuration
* **Backend**:
	+ Create a `.env` file in the `backend` directory with the following variables:
		- `MONGODB_URI`: MongoDB connection string
		- `PORT`: Port number for the backend server
* **Frontend**:
	+ Create a `.env` file in the `frontend` directory with the following variables:
		- `REACT_APP_BACKEND_URL`: URL of the backend server

### Usage
1. Start the backend server: `cd backend && npm start`
2. Start the frontend server: `cd frontend && npm start`
3. Open a web browser and navigate to `http://localhost:3000`

## Development
### Setting up the Development Environment
1. Install the required dependencies: `npm install`
2. Start the backend server: `npm start`
3. Start the frontend server: `npm start`

### Running Tests
1. Run backend tests: `cd backend && npm test`
2. Run frontend tests: `cd frontend && npm test`

## Deployment
### Production Deployment
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the backend: `cd backend && npm start`
3. Deploy the frontend: `cd frontend && npm start`

## API Documentation
### Disease Prediction API
* **Endpoint**: `/predict`
* **Method**: `POST`
* **Request Body**:
	+ `symptoms`: Array of symptoms
* **Response**:
	+ `prediction`: Predicted disease

## Contributing
Contributions are welcome! Please submit a pull request with your changes.

## Troubleshooting
* **Backend**:
	+ Check the MongoDB connection string
	+ Check the port number
* **Frontend**:
	+ Check the React app configuration
	+ Check the browser console for errors

## Roadmap
* **Short-term**:
	+ Improve disease prediction accuracy
	+ Add more features to the frontend
* **Long-term**:
	+ Integrate with more machine learning algorithms
	+ Deploy the system to a cloud platform

## License & Credits
* **License**: MIT License
* **Credits**:
	+ [Vandan0101](https://github.com/vandan0101)
	+ [Contributors](https://github.com/vandan0101/Disease-Predictor/graphs/contributors)