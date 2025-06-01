# Demo Deployment: ML Model Showcase

This project demonstrates the deployment of machine learning models, featuring an Arabic letter image classifier and a simple parabola predictor. It showcases different approaches to model serving and frontend integration.

## Overview

The repository is structured into three main parts:

1.  **Python Backend (FastAPI)**: Serves an Arabic letter image classification model.
2.  **JavaScript Frontend (Client-Side TFJS)**: A web interface that allows users to interact with the Arabic letter classifier (via the FastAPI backend) and a parabola predictor model (running directly in the browser using TensorFlow.js).
3.  **Node.js Backend (Express.js)**: This section, largely shaped by community contributions, explores an alternative setup using Express.js for serving the parabola predictor model. It includes a web interface for interaction. (*Note: The TFJS model integration in `express/src/lib/tfjs.js` appears to be a work-in-progress, and further JavaScript expertise could enhance this component.*)

## Features

* **Arabic Letter Prediction**: Upload an image of an Arabic letter and get the predicted character and confidence score. Powered by a TensorFlow/Keras model served via a FastAPI backend.
* **Parabola Prediction**:
    - **Client-Side TFJS**: Enter a numerical value (x) and get a predicted value (y) from a simple regression model running directly in the browser using TensorFlow.js.
    - **Express.js API (Experimental)**: An Express backend is set up to potentially serve the same parabola model, though the prediction logic is not fully active in the current `express/src/index.js`.

## Live Demo

The project's frontend interfaces can be accessed via GitHub Pages:
* **Main Frontend (`frontend/index.html`)**: [View on GitHub Pages](https://lightdani.github.io/demo_deployment/frontend/index.html)
* **Express Web Interface (`express/web/index.html`)**: [View on GitHub Pages](https://lightdani.github.io/demo_deployment/express/web/index.html)

These frontends interact with the deployed FastAPI backend for Arabic letter prediction:
* **FastAPI API Endpoint**: `https://demodeployment-production-2205.up.railway.app/predict`

## Tech Stack

* **Backend (Arabic Letter Prediction)**:
    - Python 3.10
    - FastAPI
    - TensorFlow (for Keras model)
    - Uvicorn (ASGI server)
* **Frontend (Client-Side TFJS & Express Web)**:
    - HTML, CSS, JavaScript
    - TensorFlow.js (`@tensorflow/tfjs`)
* **Backend (Express.js - Parabola)**:
    - Node.js
    - Express.js
    - `@tensorflow/tfjs` (potentially `@tensorflow/tfjs-node`, though `tfjs.js` is commented). Development in this JavaScript-based component is primarily contributor-driven.
    - CORS

## Project Structure

```
.
├── backend/                         # FastAPI application for Arabic Letter Prediction
│   ├── main.py                      # FastAPI app logic
│   ├── requirements.txt             # Python dependencies
│   └── model/                       # Expected location for saved model
│       ├── deployed_model/1         # Model with .pb format
│       ├── model.h5                 # Model with .h5 format
│       └── model.keras              # Model with .keras format
├── express/                         # Express.js application
│   ├── src/
│   │   ├── index.js                 # Express server setup
│   │   ├── lib/
│   │   │   └── tfjs.js              # (Commented out) TFJS model loading for Node.js
│   │   └── models/
│   │       ├── model.json           # TFJS graph model for parabola prediction
│   │       └── group1-shard1of1.bin # TFJS model weights
│   ├── web/
│   │   ├── index.html               # Frontend for Express app
│   │   └── script.js                # JS for express/web/index.html
│   ├── package.json
│   └── package-lock.json
├── frontend/                        # Client-side TFJS application
│   ├── index.html                   # Main HTML page
│   ├── script.js                    # Client-side logic and TFJS integration
│   └── tfjs_model/
│       ├── model.json               # TFJS graph model for parabola prediction
│       └── group1-shard1of1.bin     # TFJS model weights
└── README.md                        # This file
```

## Usage

**Arabic Letter Prediction:**
1.  Open given GitHub Pages.
2.  In the "Arabic Letter Prediction" section, click "Choose File" to select an image of an Arabic letter.
3.  Click "Predict". The predicted letter and confidence will be displayed.

**Parabola Prediction (Client-Side TFJS via `frontend/index.html`):**
1.  Open given GitHub Pages.
2.  In the "Parabola Predictor (TFJS)" section, enter a numerical value for X.
3.  Click "Predict Y". The predicted Y value from the client-side TFJS model will be displayed.

## Models

* **Arabic Letter Model (`backend/model/`):**
    - This is a TensorFlow Keras model expected to be provided by the user.
    - Input: Image file. The backend preprocesses it into a 32x32 grayscale tensor.
    - Output: Prediction for one of 28 Arabic letters and a confidence score.
* **Parabola Model (`.json` and `.bin` files in `frontend/tfjs_model/` and `express/src/models/`):**
    - This is a TensorFlow.js graph model.
    - Generated by TensorFlow.js Converter v4.22.0 from a model trained with TensorFlow 2.15.0.
    - Signature:
        * Input (`input_1`): A tensor of shape `[-1, 1]` (e.g., `[[x_value]]`) with `DT_FLOAT`.
        * Output (`dense_1`): A tensor of shape `[-1, 1]` (e.g., `[[y_value]]`) with `DT_FLOAT`.

---