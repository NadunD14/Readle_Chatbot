# Readle AI Chatbot Integration

This document explains how to set up and use the Ollama-powered chatbot in your Readle application.

## Prerequisites

1. **Ollama Installation**: Download and install Ollama from [https://ollama.ai](https://ollama.ai)
2. **Python Environment**: Conda environment named "readle" with required packages
3. **Node.js**: For running the Next.js application

## Setup Instructions

### 1. Install Ollama Models

After installing Ollama, download the required models:

```bash
ollama pull llama2
ollama pull llama3
ollama pull mistral
ollama pull codellama
```

### 2. Start Ollama Service

```bash
ollama serve
```

Keep this running in a separate terminal.

### 3. Install Python Dependencies

```bash
# Activate the readle environment
conda activate readle

# Install packages
pip install -r requirements.txt
```

### 4. Environment Variables (Optional)

Create a `.env` file in the project root:

```env
LANGSMITH_TRACING_V2=true
LANGSMITH_API_KEY=your_api_key_here
```

## Running the Chatbot

### Option 1: Integrated with Next.js (Recommended)

1. Start the FastAPI backend:
```bash
conda activate readle
python chatbot_api.py
```

2. Start your Next.js application:
```bash
npm run dev
```

3. The floating chatbot button will appear in the bottom-right corner
4. Visit `/chatbot` page for the full chatbot interface

### Option 2: Standalone Streamlit App

1. Start the Streamlit chatbot:
```bash
conda activate readle
streamlit run chatbot_streamlit.py
```

2. Open http://localhost:8501 in your browser

### Option 3: Use Startup Scripts

**Windows:**
```bash
./start_chatbot.bat
```

**Linux/Mac:**
```bash
chmod +x start_chatbot.sh
./start_chatbot.sh
```

## Features

### Integrated Chatbot Components

1. **FloatingChatbot**: Floating button with modal chatbot
   - Appears on all pages
   - Quick access to AI assistant
   - Modern, responsive design

2. **Chatbot Page**: Full-featured chat interface at `/chatbot`
   - Dedicated chatbot page
   - Model selection
   - Chat history
   - Quick question buttons

3. **Streamlit App**: Standalone chatbot application
   - Independent web app
   - Model switching
   - Chat history management

### AI Capabilities

- **Dyslexia Support**: Specialized responses for reading difficulties
- **Educational Guidance**: Learning strategies and techniques  
- **Reading Strategies**: Evidence-based reading improvement methods
- **Progress Tracking**: Advice on monitoring learning progress
- **Child-Friendly**: Age-appropriate language and responses

## API Endpoints

### FastAPI Backend (`http://localhost:8000`)

- `GET /`: Health check
- `GET /health`: Service status
- `POST /chat`: Send message to chatbot
- `GET /models`: Available AI models

### Example API Usage

```javascript
const response = await fetch('http://localhost:8000/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: "What are some reading strategies for dyslexia?",
    model: "llama2"
  })
});

const data = await response.json();
console.log(data.response);
```

## Customization

### Modifying the AI Prompt

Edit the system prompt in both files:

- `chatbot_api.py` (line ~25)
- `chatbot_streamlit.py` (line ~15)

### Adding New Models

1. Install the model with Ollama:
```bash
ollama pull model_name
```

2. Add to the models list in:
   - `chatbot_api.py`
   - `chatbot_streamlit.py` 
   - React components

### Styling

The React components use Tailwind CSS. Modify the className properties to change the appearance.

## Troubleshooting

### Common Issues

1. **"Ollama not found"**: Make sure Ollama service is running (`ollama serve`)

2. **"Model not available"**: Download the model first (`ollama pull model_name`)

3. **CORS errors**: Ensure the FastAPI CORS settings include your Next.js URL

4. **Python import errors**: Activate the correct conda environment (`conda activate readle`)

5. **Port conflicts**: 
   - FastAPI: Port 8000
   - Streamlit: Port 8501
   - Next.js: Port 3000

### Debugging

1. Check Ollama status:
```bash
ollama list
```

2. Test API directly:
```bash
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "model": "llama2"}'
```

3. Check logs in terminal where services are running

## Performance Tips

1. **Model Selection**: 
   - llama2: Good balance of speed and quality
   - llama3: Better quality, slower
   - mistral: Fast and efficient

2. **Hardware**: GPU acceleration improves response times significantly

3. **Memory**: Larger models require more RAM

## Security Notes

- The chatbot is designed for educational purposes
- No sensitive data is stored
- All conversations are processed locally via Ollama
- API endpoints should be secured in production

## Contributing

To add new features or improve the chatbot:

1. Fork the repository
2. Make your changes
3. Test with different Ollama models
4. Submit a pull request

## Support

For issues related to:
- **Ollama**: Visit [Ollama Documentation](https://github.com/ollama/ollama)
- **LangChain**: Check [LangChain Docs](https://langchain.readthedocs.io/)
- **Readle Integration**: Open an issue in this repository
