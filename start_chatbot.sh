#!/bin/bash

echo "Starting Readle Chatbot Services..."
echo

echo "[1/3] Activating conda environment..."
source activate readle

echo "[2/3] Starting FastAPI backend..."
python chatbot_api.py &
API_PID=$!

echo "[3/3] Starting Streamlit chatbot..."
streamlit run chatbot_streamlit.py &
STREAMLIT_PID=$!

echo
echo "✅ All services started!"
echo
echo "Services running:"
echo "- FastAPI Backend: http://localhost:8000"
echo "- Streamlit Chatbot: http://localhost:8501"
echo "- Next.js App: http://localhost:3000 (run 'npm run dev' separately)"
echo
echo "Process IDs:"
echo "- API: $API_PID"
echo "- Streamlit: $STREAMLIT_PID"
echo
echo "To stop services, run: kill $API_PID $STREAMLIT_PID"

# Keep script running
wait
