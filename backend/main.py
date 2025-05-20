from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with GitHub Pages URL for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.saved_model.load("model/deployed_model/1")

arabic_letters = [
    "ا - Alif",
    "ب - Ba",
    "ت - Ta",
    "ث - Tha",
    "ج - Jeem",
    "ح - Ha",
    "خ - Kha",
    "د - Dal",
    "ذ - Thal",
    "ر - Ra",
    "ز - Zay",
    "س - Seen",
    "ش - Sheen",
    "ص - Sad",
    "ض - Dad",
    "ط - Ta",
    "ظ - Dha",
    "ع - Ain",
    "غ - Ghayn",
    "ف - Fa",
    "ق - Qaf",
    "ك - Kaf",
    "ل - Lam",
    "م - Meem",
    "ن - Noon",
    "ه - Ha",
    "و - Waw",
    "ي - Ya",
]


def preprocess_image(image_bytes):
    image = tf.io.decode_image(image_bytes, channels=1)
    image = tf.image.resize(image, [32, 32])
    image = image / 255.0
    image_tensor = tf.expand_dims(image, 0)
    image_tensor = image_tensor.numpy().tolist()
    return image_tensor


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image_tensor = preprocess_image(image_bytes)
    prediction = model(image_tensor)
    predicted_class = int(np.argmax(prediction[0]))
    confidence = float(np.max(prediction[0]))

    return {
        "predicted_class": predicted_class,
        "label": arabic_letters[predicted_class],
        "confidence": confidence,
    }
