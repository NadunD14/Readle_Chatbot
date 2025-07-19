@echo off
echo Starting Readle Chatbot Services...
echo.

echo [1/3] Activating conda environment...
call conda activate readle

echo [2/3] Starting FastAPI backend...
start "Readle API" cmd /k "conda activate readle && python chatbot_api.py"

echo [3/3] Starting Streamlit chatbot...
start "Readle Streamlit" cmd /k "conda activate readle && streamlit run chatbot_streamlit.py"

echo.
echo ✅ All services started!
echo.
echo Services running:
echo - FastAPI Backend: http://localhost:8000
echo - Streamlit Chatbot: http://localhost:8501
echo - Next.js App: http://localhost:3000 (run 'npm run dev' separately)
echo.
echo To stop services, close the respective command windows.
pause
