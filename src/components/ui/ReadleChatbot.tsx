"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Settings, Trash2 } from 'lucide-react';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    sourcesUsed?: boolean;
}

interface ChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

// Helper function to detect and format structured content
const formatMessageContent = (content: string) => {
    if (!content) return content;

    // Check for numbered lists (1. 2. 3. or 1) 2) 3))
    const numberedListRegex = /^(\d+[\.\)]\s+.+)$/gm;
    const numberedMatches = content.match(numberedListRegex);

    // Check for bullet points (- • * or similar)
    const bulletListRegex = /^([-•*]\s+.+)$/gm;
    const bulletMatches = content.match(bulletListRegex);

    // Check for step-by-step format
    const stepRegex = /^(Step\s+\d+[:\.]?\s+.+)$/gim;
    const stepMatches = content.match(stepRegex);

    if (numberedMatches && numberedMatches.length > 1) {
        return formatNumberedList(content);
    } else if (bulletMatches && bulletMatches.length > 1) {
        return formatBulletList(content);
    } else if (stepMatches && stepMatches.length > 1) {
        return formatStepList(content);
    }

    // Handle mixed content with some structure
    return formatMixedContent(content);
};

const formatNumberedList = (content: string) => {
    const parts = content.split(/(\d+[\.\)]\s+)/);
    const formatted = [];
    let currentItem = '';

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (/^\d+[\.\)]\s+$/.test(part)) {
            // This is a number marker
            if (currentItem.trim()) {
                formatted.push({ type: 'text', content: currentItem.trim() });
            }
            currentItem = part;
        } else if (currentItem && /^\d+[\.\)]\s+$/.test(parts[i - 1])) {
            // This is content after a number marker
            currentItem += part;
            formatted.push({ type: 'numbered', content: currentItem.trim() });
            currentItem = '';
        } else if (!currentItem) {
            // Regular text before any numbering
            if (part.trim()) {
                formatted.push({ type: 'text', content: part.trim() });
            }
        }
    }

    if (currentItem.trim()) {
        formatted.push({ type: 'text', content: currentItem.trim() });
    }

    return formatted;
};

const formatBulletList = (content: string) => {
    const parts = content.split(/(^[-•*]\s+.+$)/gm);
    const formatted = [];

    for (const part of parts) {
        if (/^[-•*]\s+/.test(part.trim())) {
            formatted.push({ type: 'bullet', content: part.trim() });
        } else if (part.trim()) {
            formatted.push({ type: 'text', content: part.trim() });
        }
    }

    return formatted;
};

const formatStepList = (content: string) => {
    const parts = content.split(/(^Step\s+\d+[:\.]?\s+.+$)/gim);
    const formatted = [];

    for (const part of parts) {
        if (/^Step\s+\d+[:\.]?\s+/i.test(part.trim())) {
            formatted.push({ type: 'step', content: part.trim() });
        } else if (part.trim()) {
            formatted.push({ type: 'text', content: part.trim() });
        }
    }

    return formatted;
};

const formatMixedContent = (content: string) => {
    // Split by double line breaks to identify paragraphs
    const paragraphs = content.split(/\n\s*\n/);
    const formatted = [];

    for (const paragraph of paragraphs) {
        if (!paragraph.trim()) continue;

        // Check if this paragraph contains list items
        const lines = paragraph.split('\n');
        let hasListItems = false;
        const paragraphItems = [];

        for (const line of lines) {
            if (/^\d+[\.\)]\s+/.test(line.trim())) {
                paragraphItems.push({ type: 'numbered', content: line.trim() });
                hasListItems = true;
            } else if (/^[-•*]\s+/.test(line.trim())) {
                paragraphItems.push({ type: 'bullet', content: line.trim() });
                hasListItems = true;
            } else if (/^Step\s+\d+[:\.]?\s+/i.test(line.trim())) {
                paragraphItems.push({ type: 'step', content: line.trim() });
                hasListItems = true;
            } else if (line.trim()) {
                paragraphItems.push({ type: 'text', content: line.trim() });
            }
        }

        if (hasListItems) {
            formatted.push(...paragraphItems);
        } else {
            formatted.push({ type: 'text', content: paragraph.trim() });
        }
    }

    return formatted;
};

// Component to render formatted content
const FormattedMessage = ({ content }: { content: string }) => {
    const formattedContent = formatMessageContent(content);

    // If it's just a string (no formatting needed), return as-is
    if (typeof formattedContent === 'string') {
        return <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>;
    }

    return (
        <div className="text-sm leading-relaxed space-y-2">
            {formattedContent.map((item, index) => {
                switch (item.type) {
                    case 'numbered':
                        return (
                            <div key={index} className="flex items-start gap-2 ml-2">
                                <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                                    {item.content.match(/^(\d+)/)?.[1] || '•'}
                                </div>
                                <p className="flex-1">
                                    {item.content.replace(/^\d+[\.\)]\s+/, '')}
                                </p>
                            </div>
                        );
                    case 'bullet':
                        return (
                            <div key={index} className="flex items-start gap-2 ml-2">
                                <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                                <p className="flex-1">
                                    {item.content.replace(/^[-•*]\s+/, '')}
                                </p>
                            </div>
                        );
                    case 'step':
                        return (
                            <div key={index} className="flex items-start gap-3 ml-2 p-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-l-2 border-indigo-300">
                                <div className="flex-shrink-0 w-8 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded text-xs font-medium flex items-center justify-center">
                                    {item.content.match(/Step\s+(\d+)/i)?.[1] || 'S'}
                                </div>
                                <p className="flex-1 font-medium">
                                    {item.content.replace(/^Step\s+\d+[:\.]?\s+/i, '')}
                                </p>
                            </div>
                        );
                    case 'text':
                    default:
                        return (
                            <p key={index} className={item.content.length > 100 ? 'mb-3' : ''}>
                                {item.content}
                            </p>
                        );
                }
            })}
        </div>
    );
};

const ReadleChatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Hi! I'm your Readle AI Assistant. I'm here to help with questions about dyslexia, reading strategies, and learning support. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            initializeChat();
        }
    }, [isOpen]);

    const initializeChat = async () => {
        try {
            const response = await fetch('http://localhost:8000/chat/session/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSessionId(data.session_id);
            }
        } catch (error) {
            console.error('Error creating session:', error);
        }
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentMessage = inputMessage;
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: currentMessage,
                    session_id: sessionId,
                    use_rag: true // Always use RAG for enhanced knowledge
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to get response from chatbot');
            }

            const data = await response.json();

            // Update session ID if it changed
            if (data.session_id && data.session_id !== sessionId) {
                setSessionId(data.session_id);
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.response,
                sender: 'bot',
                timestamp: new Date(),
                sourcesUsed: data.sources_used
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: error instanceof Error
                    ? `Sorry, I encountered an error: ${error.message}. Please check your GROQ_API_KEY and try again.`
                    : "Sorry, I'm having trouble connecting right now. Please make sure the API service is running and try again.",
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

    const clearChat = async () => {
        if (sessionId) {
            try {
                await fetch(`http://localhost:8000/chat/session/${sessionId}`, {
                    method: 'DELETE'
                });
            } catch (error) {
                console.error('Error clearing session:', error);
            }
        }

        // Create new session and reset messages
        await initializeChat();
        setMessages([
            {
                id: '1',
                content: "Hi! I'm your Readle AI Assistant. I'm here to help with questions about dyslexia, reading strategies, and learning support. How can I help you today?",
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
        setShowSettings(false); // Close settings after clearing
    };

    if (!isOpen) return null;

    return (
        <div className="h-full flex flex-col bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Header */}
            {/* <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Readle Assistant</h3>
                        <p className="text-xs opacity-80">Your dyslexia support companion</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <Settings className="w-4 h-4" />
                </button>
            </div> */}

            {/* Settings Panel */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50 border-b px-4 py-3 overflow-hidden"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-gray-700">Chat Options</h4>
                                <p className="text-xs text-gray-500">Manage your conversation</p>
                            </div>
                            <button
                                onClick={clearChat}
                                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear Chat
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                    <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.sender === 'bot' && (
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                        )}
                        <div className="max-w-[85%] space-y-1">
                            <div
                                className={`p-3 rounded-2xl ${message.sender === 'user'
                                    ? 'bg-white text-gray-800 rounded-br-md'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-bl-md'
                                    }`}
                                style={message.sender === 'bot' ? { boxShadow: 'none', border: 'none' } : {}}
                            >
                                {message.sender === 'user' ? (
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                ) : (
                                    <FormattedMessage content={message.content} />
                                )}
                            </div>
                            <div className="flex items-center justify-between px-2">
                                <p className="text-xs text-gray-400">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                {message.sender === 'bot' && message.sourcesUsed && (
                                    <span className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-2 py-0.5 rounded-full border">
                                        📚 Enhanced
                                    </span>
                                )}
                            </div>
                        </div>
                        {message.sender === 'user' && (
                            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-white" />
                            </div>
                        )}
                    </motion.div>
                ))}

                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 justify-start"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white border shadow-sm p-3 rounded-2xl rounded-bl-md">
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                                <span className="text-sm text-gray-600">Thinking...</span>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t bg-white p-4">
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <textarea
                            value={inputMessage}
                            onChange={(e) => {
                                setInputMessage(e.target.value);
                                const textarea = e.target as HTMLTextAreaElement;
                                textarea.style.height = 'auto';
                                textarea.style.height = textarea.scrollHeight + 'px';
                            }}
                            onInput={(e) => {
                                const textarea = e.target as HTMLTextAreaElement;
                                textarea.style.height = 'auto';
                                textarea.style.height = textarea.scrollHeight + 'px';
                            }}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about dyslexia support"
                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm bg-gray-50"
                            rows={1}
                            disabled={isLoading}
                            style={{ minHeight: '44px', overflowY: 'hidden' }}
                        />
                    </div>
                    <button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex items-center justify-center mt-2">
                    <p className="text-xs text-gray-400">
                        Powered by Groq • Enhanced with dyslexia knowledge • Emotional support ready
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReadleChatbot;