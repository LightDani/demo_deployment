const form = document.getElementById("upload-form");
const fileInput = document.getElementById("file-input");
const resultDiv = document.getElementById("result");

// Change this to your deployed API URL (e.g. on Render)
const API_URL = "https://demodeployment-production-2205.up.railway.app/predict";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  resultDiv.textContent = "Predicting...";

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
