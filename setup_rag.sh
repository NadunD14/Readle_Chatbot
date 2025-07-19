#!/bin/bash

echo "Installing RAG dependencies for Readle Chatbot..."

# Activate conda environment (if using conda)
if command -v conda &> /dev/null; then
    echo "Activating conda environment 'readle'..."
    conda activate readle
fi

# Install the required packages
echo "Installing Python packages..."
pip install -r requirements.txt

echo "RAG dependencies installed successfully!"
echo ""
echo "To use RAG features:"
echo "1. Make sure Ollama is running: ollama serve"
echo "2. Pull the required models: ollama pull llama2"
echo "3. Start the chatbot API: python chatbot_api.py"
echo ""
echo "The RAG system will automatically initialize with dyslexia-related websites."
