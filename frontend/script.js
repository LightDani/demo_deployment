const form = document.getElementById("upload-form");
const fileInput = document.getElementById("file-input");
const resultDiv = document.getElementById("result");

const tfjsForm = document.getElementById("tfjs-form");
const xInput = document.getElementById("x-input");
const tfjsResult = document.getElementById("tfjs-result");

const API_URL = "https://demodeployment-production-2205.up.railway.app/predict";

// 1. FastAPI image prediction
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  resultDiv.textContent = "Predicting Arabic letter...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    resultDiv.innerHTML = `<strong>${
      result.label
    }</strong> (Confidence: ${result.confidence.toFixed(2)})`;
  } catch (err) {
    resultDiv.textContent = "Prediction failed.";
    console.error(err);
  }
});

// 2. TFJS Parabola model loading
let parabolaModel;
(async () => {
  try {
    // Adjust the path to where you host the tfjs model
    parabolaModel = await tf.loadGraphModel("tfjs_model/model.json");
    console.log("TFJS model loaded");
  } catch (err) {
    tfjsResult.textContent = "Failed to load model.";
    console.error("Model load error:", err);
  }
})();

// 3. TFJS prediction handler
tfjsForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const xVal = parseFloat(xInput.value);
  if (isNaN(xVal)) {
    tfjsResult.textContent = "Please enter a valid number.";
    return;
  }

  if (!parabolaModel) {
    tfjsResult.textContent = "Model not loaded yet.";
    return;
  }

  const inputTensor = tf.tensor2d([[xVal]]);
  const prediction = parabolaModel.predict(inputTensor);
  const yVal = (await prediction.data())[0];

  tfjsResult.innerHTML = `Predicted Y: <strong>${yVal.toFixed(4)}</strong>`;
});
