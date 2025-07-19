"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2, Settings, BookOpen, Brain, Heart } from 'lucide-react';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const ChatbotPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Welcome to your personal Readle AI Assistant! I'm here to help you with reading strategies, dyslexia support, and learning techniques. I can answer questions about your child's progress, suggest activities, or provide educational guidance. What would you like to know?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState('llama2');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const models = [
        { value: 'llama2', label: 'Llama 2' },
        { value: 'llama3', label: 'Llama 3' },
        { value: 'mistral', label: 'Mistral' },
        { value: 'codellama', label: 'Code Llama' }
    ];

    const quickQuestions = [
        "What are some effective reading strategies for dyslexia?",
        "How can I make reading more engaging for my child?",
        "What signs indicate reading difficulties?",
        "How does text-to-speech technology help?",
        "What activities can improve reading comprehension?",
        "How can I track my child's reading progress?"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (messageText?: string) => {
        const text = messageText || inputMessage;
        if (!text.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: text,
                    model: selectedModel
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response from chatbot');
            }

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.response,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "Sorry, I'm having trouble connecting right now. Please make sure the Ollama service is running and try again. You can start it by running 'ollama serve' in your terminal.",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        setMessages([
            {
                id: '1',
                content: "Welcome back! I'm here to help you with reading strategies, dyslexia support, and learning techniques. What would you like to explore today?",
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <Bot className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            AI Assistant
                        </h1>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Your personal guide for dyslexia support, reading strategies, and educational guidance.
                        Ask me anything about your child's learning journey.
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        {/* Model Selection */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                Settings
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">AI Model:</label>
                                    <select
                                        value={selectedModel}
                                        onChange={(e) => setSelectedModel(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {models.map((model) => (
                                            <option key={model.value} value={model.value}>
                                                {model.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={clearChat}
                                    className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                >
                                    Clear Chat
                                </button>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Brain className="w-5 h-5" />
                                Quick Questions
                            </h3>
                            <div className="space-y-2">
                                {quickQuestions.slice(0, 4).map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => sendMessage(question)}
                                        className="w-full text-left text-sm p-3 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors"
                                        disabled={isLoading}
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Heart className="w-5 h-5" />
                                I can help with:
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-indigo-600" />
                                    Reading strategies
                                </li>
                                <li className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-indigo-600" />
                                    Dyslexia support
                                </li>
                                <li className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-indigo-600" />
                                    Learning techniques
                                </li>
                                <li className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-indigo-600" />
                                    Progress tracking
                                </li>
                                <li className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-indigo-600" />
                                    Educational guidance
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Chat Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-3"
                    >
                        <div className="bg-white rounded-xl shadow-sm h-[700px] flex flex-col">
                            {/* Chat Header */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Readle AI Assistant</h3>
                                        <p className="text-sm text-gray-500">
                                            Powered by {models.find(m => m.value === selectedModel)?.label}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.sender === 'bot' && (
                                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[80%] p-4 rounded-2xl ${message.sender === 'user'
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                            <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                                                }`}>
                                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        {message.sender === 'user' && (
                                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-4 justify-start"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                                            <Bot className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="bg-gray-100 p-4 rounded-2xl">
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                                                <span className="text-gray-600">Thinking...</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-6 border-t border-gray-200">
                                <div className="flex gap-3">
                                    <textarea
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask about reading strategies, dyslexia support, or learning tips..."
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                        rows={2}
                                        disabled={isLoading}
                                    />
                                    <button
                                        onClick={() => sendMessage()}
                                        disabled={!inputMessage.trim() || isLoading}
                                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;
