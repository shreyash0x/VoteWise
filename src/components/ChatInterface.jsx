import { useState, useEffect, useRef, useCallback } from 'react';
import MessageBubble from './MessageBubble';
import InteractiveCard from './InteractiveCard';
import ProgressTracker from './ProgressTracker';
import FactCard from './FactCard';
import { initialGreeting, conversations } from '../data/conversations';
import { 
  UserPlus, ListChecks, MapPin, HelpCircle, 
  FileSignature, CheckSquare, Vote, BarChart, 
  ArrowLeft, ArrowRight, Home, FileText, 
  CreditCard, XCircle, GraduationCap, Users, 
  ChevronRight 
} from 'lucide-react';

const iconMap = {
  UserPlus, ListChecks, MapPin, HelpCircle, 
  FileSignature, CheckSquare, Vote, BarChart, 
  ArrowLeft, ArrowRight, Home, FileText, 
  CreditCard, XCircle, GraduationCap, Users, 
  ChevronRight
};

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', ...initialGreeting }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState('Beginner');
  const messagesEndRef = useRef(null);

  const adaptResponseText = useCallback((text, fact, currentMode) => {
    if (!text) return text;
    // Don't adapt the initial greeting or very short texts
    if (text.length < 50) return text; 

    if (currentMode === 'Quick') {
      const lines = text.split('\n').filter(l => l.trim().length > 0);
      return "⚡ **Quick Summary:**\n" + lines.map(l => l.startsWith('*') || /^\d+\./.test(l.trim()) ? l : `* ${l}`).join('\n');
    }
    if (currentMode === 'Deep') {
      return text + (fact ? `\n\n📚 **Deep Dive:**\n${fact}` : "");
    }
    // Beginner mode adds friendly intro
    if (text.includes('**Step') || text.includes('**Tips') || text.includes('To register')) {
      return "👋 **Here's a simple explanation:**\n\n" + text;
    }
    return text;
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOptionSelect = useCallback((option) => {
    const userMessage = { id: Date.now(), sender: 'user', text: option.label };
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);
    
    setTimeout(() => {
      const nextConvo = conversations[option.targetId];
      if (nextConvo) {
        if (nextConvo.step !== undefined) {
          setCurrentStep(nextConvo.step);
        }
        
        let enhancedOptions = [...nextConvo.options];
        // Smart Suggestion Logic: If no 'main_menu' option exists, add one.
        if (!enhancedOptions.some(opt => opt.targetId === 'main_menu')) {
          enhancedOptions.push({ label: "💡 Suggestion: Main Menu", targetId: "main_menu", icon: "Home" });
        }

        const botMessage = {
          id: Date.now() + 1,
          sender: 'bot',
          text: adaptResponseText(nextConvo.text, nextConvo.fact, mode),
          options: enhancedOptions,
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
  }, [adaptResponseText, mode]);

  const handleRestart = useCallback(() => {
    setMessages([{ id: Date.now(), sender: 'bot', ...initialGreeting }]);
    setCurrentStep(0);
  }, []);

  const currentBotMessage = messages.filter(m => m.sender === 'bot').pop();
  const currentOptions = currentBotMessage?.options || [];
  const currentFact = currentBotMessage?.fact;
  const isHeroMode = currentBotMessage?.isHero && !isTyping;

  return (
    <div className="journey-layout">
      {/* Sidebar: Progress Tracker */}
      <aside className="sidebar-container" aria-label="Sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="ai-orb mini-orb">
              <div className="orb-core"></div>
              <div className="orb-ring"></div>
            </div>
            <h1>VoteWise</h1>
          </div>
          <div className="header-actions">
            <select value={mode} onChange={(e) => setMode(e.target.value)} className="mode-select" aria-label="Learning Mode">
              <option value="Beginner">Beginner</option>
              <option value="Quick">Quick</option>
              <option value="Deep">Deep</option>
            </select>
            <button onClick={handleRestart} className="restart-btn" title="Start Over" aria-label="Restart conversation">
              Restart
            </button>
          </div>
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
      </aside>

      {/* Main Area: Chat Interface */}
      <main className="chat-container main-content-area">
        <div className="chat-messages" aria-live="polite" aria-relevant="additions">
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
                  const Icon = iconMap[opt.icon] || ChevronRight;
                  return (
                    <button key={idx} className="quick-chip" onClick={() => handleOptionSelect(opt)} aria-label={opt.label}>
                      <Icon size={16} />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="interactive-grid">
                {currentOptions.map((opt, idx) => (
                  <InteractiveCard key={idx} option={opt} onClick={handleOptionSelect} IconComponent={iconMap[opt.icon] || ChevronRight} />
                ))}
              </div>
            )
          ) : (
            <div className="waiting-placeholder" aria-live="polite" aria-atomic="true">
               {isTyping ? "VoteWise is thinking..." : "End of conversation."}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChatInterface;
