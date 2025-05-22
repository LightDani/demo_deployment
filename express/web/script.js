const form = document.getElementById("upload-form");
const fileInput = document.getElementById("file-input");
const resultDiv = document.getElementById("result");

const tfjsForm = document.getElementById("tfjs-form");
const xInput = document.getElementById("x-input");
const tfjsResult = document.getElementById("tfjs-result");

const API_URL = "https://demodeployment-production-2205.up.railway.app/predict";
const API_URL_EXPRESS = "http://localhost:3000/data";

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

// 3. TFJS prediction handler
tfjsForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	try {
		const response = await fetch(API_URL_EXPRESS, {
			method: "POST",
			headers: {
				"Content-Type": "application/json", // penting!
			},
			body: JSON.stringify({
				xVal: parseInt(xInput.value),
			}),
		});
		const result = await response.json();
		tfjsResult.innerHTML = `Predicted Y: <strong>${result.message}</strong>`;
	} catch (err) {
		console.log(err.message);
		tfjsResult.textContent = err.message;
		console.error(err);
	}
});
