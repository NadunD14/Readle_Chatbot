@echo off
echo Installing RAG dependencies for Readle Chatbot...

REM Activate conda environment (if using conda)
if exist "%USERPROFILE%\miniconda3\Scripts\activate.bat" (
    echo Activating conda environment 'readle'...
    call "%USERPROFILE%\miniconda3\Scripts\activate.bat" readle
) else if exist "%USERPROFILE%\anaconda3\Scripts\activate.bat" (
    echo Activating conda environment 'readle'...
    call "%USERPROFILE%\anaconda3\Scripts\activate.bat" readle
)

REM Install the required packages
echo Installing Python packages...
pip install -r requirements.txt

echo RAG dependencies installed successfully!
echo.
echo To use RAG features:
echo 1. Make sure Ollama is running: ollama serve
echo 2. Pull the required models: ollama pull llama2
echo 3. Start the chatbot API: python chatbot_api.py
echo.
echo The RAG system will automatically initialize with dyslexia-related websites.

pause
