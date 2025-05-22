// const tf = require("@tensorflow/tfjs-node");
// // prequest
// // py minver 3.6.00
// // node-gyp
// // node-pre-gyp

// const path = require("path");

// let parabolaModel;

// tf.loadGraphModel(`file://${path.join(__dirname, "models/model.json")}`)
// 	.then((model) => {
// 		console.log("Model berhasil dimuat!");
// 		parabolaModel = model;
// 	})
// 	.catch((err) => {
// 		console.error("Gagal memuat model:", err);
// 	});

// const predict = (xInput) => {
// 	const xVal = parseFloat(xInput);

// 	if (!isNaN(xVal)) {
// 		console.log("Predict error : Parameter is not a number.");
// 		throw error("Parameter is not a number.");
// 	}

// 	if (!parabolaModel) {
// 		console.log("Predict error : Model not found.");
// 		throw error("Model not found.");
// 	}

// 	const inputTensor = tf.tensor2d([[xVal]]);
// 	const prediction = parabolaModel.predict(inputTensor);
// 	const yVal = prediction.dataSync()[0];

// 	return yVal;
// };

// module.exports = { predict };
