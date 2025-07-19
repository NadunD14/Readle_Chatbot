# Chatbot Project

This repository contains a chatbot application with a Python backend (using LangChain and Groq) and a Node.js frontend. Follow the instructions below to set up and run the project locally.

## 1. Prerequisites
Before starting, ensure you have the following installed:
- [Conda](https://docs.conda.io/en/latest/miniconda.html) (Miniconda or Anaconda)
- [Node.js and npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- API Keys: Obtain from [Groq](https://console.groq.com/) and [LangChain](https://platform.langchain.com/)

## 2. Complete Setup in Terminal
Copy and paste the following commands into your terminal to complete the entire setup:

```bash
# Clone repository and enter project directory
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Create and activate Conda environment
conda create -n chatbot_env python=3.10
conda activate chatbot_env

# Create environment variables file
echo "GROQ_API_KEY=your_groq_api_key" > .env
echo "LANGCHAIN_API_KEY=your_langchain_api_key" >> .env

# Install Python dependencies
pip install -r requirements.txt

# Set up frontend
npm install
npm run dev
cd ..
