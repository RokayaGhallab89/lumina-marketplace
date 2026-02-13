import React, { useState, useRef, useEffect } from 'react';
import { getShoppingAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

const AIChat: React.FC = () => {
  const { isAiChatOpen, setIsAiChatOpen, aiContext, addToCart } = useCart();
  const { products } = useStore();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hi! I am your AI Shopping Assistant. Looking for something specific? Ask me!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Handle AI Context updates (e.g. user clicked "Ask about this product")
  useEffect(() => {
    if (aiContext) {
        // Automatically send a message or prompt based on context
        handleAutoContext(aiContext);
    }
  }, [aiContext]);

  const handleAutoContext = async (ctx: string) => {
    if(loading) return;
    
    // Add user message about context
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: ctx };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    
    // Call AI
    const history = messages.slice(-5).map(m => `${m.role}: ${m.text}`).join('\n');
    const { text, productIds } = await getShoppingAdvice(ctx, history, products);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: text,
      isProductRecommendation: productIds.length > 0,
      recommendedProductIds: productIds
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAiChatOpen) scrollToBottom();
  }, [messages, isAiChatOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Context from previous messages
    const context = messages.slice(-5).map(m => `${m.role}: ${m.text}`).join('\n');
    
    const { text, productIds } = await getShoppingAdvice(userMsg.text, context, products);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: text,
      isProductRecommendation: productIds.length > 0,
      recommendedProductIds: productIds
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const getRecommendedProducts = (ids: number[] | undefined) => {
    if (!ids) return [];
    return products.filter(p => ids.includes(p.id));
  };

  return (
    <>
      {/* Floating Button */}
      {!isAiChatOpen && (
        <button 
            onClick={() => setIsAiChatOpen(true)}
            className="fixed bottom-24 right-6 md:bottom-6 md:right-6 bg-secondary text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all z-40 flex items-center justify-center gap-2 group border-2 border-primary animate-bounce-subtle"
        >
            <i className="fa-solid fa-wand-magic-sparkles text-xl text-primary"></i>
            <span className="font-bold text-sm hidden md:block">AI Assistant</span>
        </button>
      )}

      {/* Chat Window */}
      {isAiChatOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-secondary text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-wand-magic-sparkles text-primary"></i>
              <div>
                <h3 className="font-bold text-sm">Lumina AI Guide</h3>
                <p className="text-[10px] text-gray-400">Product Helper & Recommendations</p>
              </div>
            </div>
            <button onClick={() => setIsAiChatOpen(false)} className="text-gray-400 hover:text-white">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                
                {/* Product Recommendations */}
                {msg.isProductRecommendation && msg.recommendedProductIds && (
                  <div className="mt-2 w-[85%] space-y-2">
                    {getRecommendedProducts(msg.recommendedProductIds).map(prod => (
                      <div key={prod.id} className="bg-white p-2 rounded shadow-sm border border-gray-200 flex gap-2 items-center">
                        <img src={prod.image} className="w-12 h-12 object-cover rounded" alt={prod.title} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate">{prod.title}</p>
                          <p className="text-xs text-primary">${prod.price}</p>
                        </div>
                        <button 
                           onClick={() => addToCart(prod)}
                           className="bg-primary text-white text-xs px-2 py-1 rounded hover:bg-accent"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
               <div className="flex items-start">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 rounded-tl-none flex gap-1 items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t flex gap-2">
            <input 
              type="text" 
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary"
              placeholder="Ask for recommendations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent disabled:opacity-50 transition-colors"
            >
              <i className="fa-solid fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;