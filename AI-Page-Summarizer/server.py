from flask import Flask, request, jsonify
# from transformers import pipeline
from flask_cors import CORS
import google.generativeai as genai
import os

# import logging
import requests


app = Flask(__name__)
CORS(
    app, resources={r"/summarize": {"origins": "*"}}
)  # Enable CORS for /summarize endpoint

# GEMINI SECRETS


model = genai.GenerativeModel("gemini-1.5-flash")


@app.route("/summarize", methods=["GET"])
def summarize():

    response = model.generate_content("Write a story about a AI and magic")
    print(response.text)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)


# app = Flask(__name__)
# CORS(app)

# # Configure logging
# logging.basicConfig(level=logging.DEBUG)

# # Load summarisation model
# summarizer = pipeline("summarization", model="facebook/bart-large-cnn")


# @app.route("/summarize", methods=["POST"])
# def summarize():
#     data = request.get_json()
#     text = data.get("text", "")
#     if not text:
#         return jsonify({"error": "No text provided"}), 400

#     # Log the length of the input text
#     logging.debug(f"Received text of length {len(text)}")

#     # Truncate text if it is too long
#     max_input_length = 1024  # This can be adjusted based on the model's limitations
#     if len(text) > max_input_length:
#         logging.debug(f"Truncating text to {max_input_length} characters")
#         text = text[:max_input_length]

#     try:
#         # Perform summarization
#         summary = summarizer(text, max_length=1024, min_length=30, do_sample=False)
#         return jsonify({"summary": summary[0]["summary_text"]})
#     except Exception as e:
#         logging.error(f"Error during summarization: {e}")
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     print("Starting Flask app...")
#     app.run(host="0.0.0.0", port=5000)
