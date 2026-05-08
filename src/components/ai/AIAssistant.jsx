import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '../../services/ai';
import productsData from '../../data/products.json';
import FloatingBot from './FloatingBot';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to FlexiCatalog! I am your personal shopping assistant. Are you looking for something specific today, or would you like me to ask a few questions to help narrow down your perfect product?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Optimistically add user message
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const chatHistoryStr = newMessages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
      
      const systemPrompt = `You are a highly engaging, professional sales assistant for FlexiCatalog, a premium product store. 
      Your goal is to act exactly like a real person in a high-end store.
      
      RULES:
      1. DO NOT just list products immediately unless explicitly asked.
      2. Ask qualifying questions ONE AT A TIME (e.g., "Are you prioritizing performance or luxury?", "What is your main use case?").
      3. Be highly conversational, friendly, and concise.
      4. Once you understand their needs, recommend 1 or 2 specific products from this inventory: ${JSON.stringify(productsData.map(p => ({id: p.id, name: p.itemname, category: p.category, specs: p.itemprops})))}.
      5. NEVER invent products. Only suggest from the provided JSON list.
      
      Current Chat History:
      ${chatHistoryStr}
      
      Respond directly as the ASSISTANT to the latest user message. Keep it brief and engaging.`;
      
      const response = await getGeminiResponse(userMessage, systemPrompt);
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FloatingBot isOpen={isOpen} onClick={() => setIsOpen(true)} />

      {/* AI Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-8 right-8 z-50 w-[380px] h-[600px] max-h-[80vh] flex flex-col overflow-hidden glass rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl bg-black/40"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">AI Assistant</h3>
                  <p className="text-xs text-white/50">Powered by Gemini</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-white text-black rounded-tr-sm'
                        : 'bg-white/10 text-white rounded-tl-sm border border-white/5'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 text-white p-4 rounded-2xl rounded-tl-sm border border-white/5 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/40 border-t border-white/10">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our products..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-white text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
