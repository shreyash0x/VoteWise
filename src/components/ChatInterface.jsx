import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import InteractiveCard from './InteractiveCard';
import ProgressTracker from './ProgressTracker';
import FactCard from './FactCard';
import { initialGreeting, conversations } from '../data/conversations';
import * as Icons from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', ...initialGreeting }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOptionSelect = (option) => {
    const userMessage = { id: Date.now(), sender: 'user', text: option.label };
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);
    
    setTimeout(() => {
      const nextConvo = conversations[option.targetId];
      if (nextConvo) {
        if (nextConvo.step !== undefined) {
          setCurrentStep(nextConvo.step);
        }
        
        const botMessage = {
          id: Date.now() + 1,
          sender: 'bot',
          text: nextConvo.text,
          options: nextConvo.options,
          fact: nextConvo.fact
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
         const errorMessage = {
          id: Date.now() + 1,
          sender: 'bot',
          text: "I'm sorry, I couldn't find information on that topic.",
          options: initialGreeting.options
        };
        setMessages(prev => [...prev, errorMessage]);
      }
      setIsTyping(false);
    }, 1000); // Wait 1s for typing animation
  };

  const handleRestart = () => {
    setMessages([{ id: Date.now(), sender: 'bot', ...initialGreeting }]);
    setCurrentStep(0);
  };

  const currentBotMessage = messages.filter(m => m.sender === 'bot').pop();
  const currentOptions = currentBotMessage?.options || [];
  const currentFact = currentBotMessage?.fact;
  const isHeroMode = currentBotMessage?.isHero && !isTyping;

  return (
    <div className="journey-layout">
      {/* Sidebar: Progress Tracker */}
      <div className="sidebar-container">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="ai-orb mini-orb">
              <div className="orb-core"></div>
              <div className="orb-ring"></div>
            </div>
            <h1>VoteWise</h1>
          </div>
          <button onClick={handleRestart} className="restart-btn" title="Start Over">
            Restart
          </button>
        </div>
        <div className="sidebar-content">
          <ProgressTracker currentStep={currentStep} />
          <div className="sidebar-bottom">
            <FactCard fact={currentFact} />
            <div className="credit-text">
              Made by Shreyash
            </div>
          </div>
        </div>
      </div>

      {/* Main Area: Chat Interface */}
      <div className="chat-container main-content-area">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className="message-row">
              {msg.isHero ? (
                <div className="hero-panel animate-fade-in-up">
                  <div className="hero-orb">
                    <div className="ai-orb">
                      <div className="orb-core"></div>
                      <div className="orb-ring"></div>
                    </div>
                  </div>
                  <h2>{msg.headline}</h2>
                  <p>{msg.subtext}</p>
                </div>
              ) : (
                <MessageBubble message={msg} />
              )}
            </div>
          ))}
          {isTyping && (
             <div className="message-wrapper bot-message-wrapper">
               <div className="avatar bot-avatar orb-container">
                 <div className="ai-orb">
                    <div className="orb-core"></div>
                 </div>
               </div>
               <div className="message-bubble bot-bubble typing-indicator">
                 <span></span><span></span><span></span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          {!isTyping && currentOptions && currentOptions.length > 0 ? (
            isHeroMode ? (
              <div className="quick-chips-container animate-fade-in-up">
                {currentOptions.map((opt, idx) => {
                  const Icon = Icons[opt.icon] || Icons.ChevronRight;
                  return (
                    <button key={idx} className="quick-chip" onClick={() => handleOptionSelect(opt)}>
                      <Icon size={16} />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="interactive-grid">
                {currentOptions.map((opt, idx) => (
                  <InteractiveCard key={idx} option={opt} onClick={handleOptionSelect} />
                ))}
              </div>
            )
          ) : (
            <div className="waiting-placeholder">
               {isTyping ? "VoteWise is thinking..." : "End of conversation."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
