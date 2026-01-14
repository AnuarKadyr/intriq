import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAiChat } from "@/contexts/AiChatContext";
import { X } from "lucide-react";
import "./AiChatInput.css";

// Routes where the AI assistant blob should be hidden by default
const HIDDEN_ROUTES = ["/agent/report"];

export function AiChatInput() {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { isAiChatOpen, showAssistant, openAiChat, toggleShowAssistant } = useAiChat();

  // Check if current route should hide the assistant
  const shouldHideOnRoute = HIDDEN_ROUTES.some(route => location.pathname.startsWith(route));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const iconCenterY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - iconCenterX;
      const deltaY = e.clientY - iconCenterY;
      
      const maxRotation = 20;
      const rotateY = Math.max(-maxRotation, Math.min(maxRotation, (deltaX / window.innerWidth) * 60));
      const rotateX = Math.max(-maxRotation, Math.min(maxRotation, (-deltaY / window.innerHeight) * 60));
      
      setRotation({ rotateX, rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Don't render if AI chat is open, assistant is hidden, or on a hidden route
  if (isAiChatOpen || !showAssistant || shouldHideOnRoute) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleShowAssistant();
  };

  const cardStyle = {
    transform: `perspective(1000px) rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg) translateZ(25px)`,
  };

  const eyeStyle = {
    transform: `perspective(1000px) rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg) translateZ(25px)`,
  };

  return (
    <div className="container-ai-input" ref={containerRef}>
      <button 
        className="close-button"
        onClick={handleClose}
        aria-label="Hide AI assistant"
      >
        <X className="h-3 w-3" />
      </button>
      <div className="container-wrap" onClick={openAiChat}>
        <div className="card" style={cardStyle}>
          <div className="background-blur-balls">
            <div className="balls">
              <span className="ball rosa"></span>
              <span className="ball violet"></span>
              <span className="ball green"></span>
              <span className="ball cyan"></span>
            </div>
          </div>
          <div className="content-card">
            <div className="background-blur-card">
              <div className="eyes">
                <span className="eye" style={eyeStyle}></span>
                <span className="eye" style={eyeStyle}></span>
              </div>
              <div className="eyes happy">
                <svg fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M8.28386 16.2843C8.9917 15.7665 9.8765 14.731 12 14.731C14.1235 14.731 15.0083 15.7665 15.7161 16.2843C17.8397 17.8376 18.7542 16.4845 18.9014 15.7665C19.4323 13.1777 17.6627 11.1066 17.3088 10.5888C16.3844 9.23666 14.1235 8 12 8C9.87648 8 7.61556 9.23666 6.69122 10.5888C6.33728 11.1066 4.56771 13.1777 5.09858 15.7665C5.24582 16.4845 6.16034 17.8376 8.28386 16.2843Z"
                  />
                </svg>
                <svg fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M8.28386 16.2843C8.9917 15.7665 9.8765 14.731 12 14.731C14.1235 14.731 15.0083 15.7665 15.7161 16.2843C17.8397 17.8376 18.7542 16.4845 18.9014 15.7665C19.4323 13.1777 17.6627 11.1066 17.3088 10.5888C16.3844 9.23666 14.1235 8 12 8C9.87648 8 7.61556 9.23666 6.69122 10.5888C6.33728 11.1066 4.56771 13.1777 5.09858 15.7665C5.24582 16.4845 6.16034 17.8376 8.28386 16.2843Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
