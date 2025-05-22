const express = require("express");
const cors = require("cors");
// const { predic } = require("./lib/tfjs");
const app = express();
const port = 3000;

// Middleware untuk membaca body request dalam format JSON
app.use(express.json());
app.use(cors());

// Route POST sederhana
app.post("/data", async (req, res) => {
	const xVal = req.body.xVal;
	console.log("Data diterima:", xVal);

	if (!req.body) {
		res.status(400).json({ message: "Parameter is not a number." });
	}

	// const prediction = await predic(xVal);
	// console.log("Prediction result:", prediction);

	// Kirim respon ke client
	res.status(200).json({
		message: "Data berhasil diterima",
		data: data,
	});
});

// Menjalankan server
app.listen(port, () => {
	console.log(`Server berjalan di http://localhost:${port}`);
});
