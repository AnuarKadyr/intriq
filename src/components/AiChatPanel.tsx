import { X, Send, Paperclip, Mic, Sparkles } from "lucide-react";
import { useAiChat } from "@/contexts/AiChatContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import "./AiChatPanel.css";

export function AiChatPanel() {
  const { isAiChatOpen, closeAiChat } = useAiChat();
  const [message, setMessage] = useState("");

  if (!isAiChatOpen) return null;

  return (
    <div className="w-[380px] h-full bg-white border-l border-gray-200 flex flex-col shadow-lg animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Assistant</h3>
            <p className="text-xs text-gray-500">Always here to help</p>
          </div>
        </div>
        <button
          onClick={closeAiChat}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Greeting Section */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col items-center text-center mb-8 pt-8">
          {/* AI Face Avatar */}
          <div className="ai-face-avatar mb-4 relative">
            <div className="ai-face-outer">
              <div className="ai-face-inner">
                <div className="ai-face-background">
                  <span className="ai-ball rosa"></span>
                  <span className="ai-ball violet"></span>
                  <span className="ai-ball green"></span>
                  <span className="ai-ball cyan"></span>
                </div>
                <div className="ai-face-content">
                  <div className="ai-eyes">
                    <span className="ai-eye"></span>
                    <span className="ai-eye"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Good Morning Jason 🔥
          </h2>
          <p className="text-sm text-gray-500">
            Continue your learning to achieve your target!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "1-10 Aug", value: 40 },
            { label: "11-20 Aug", value: 50 },
            { label: "21-30 Aug", value: 35 },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="w-full h-24 bg-gray-50 rounded-xl flex items-end justify-center pb-2 relative overflow-hidden">
                <div
                  className="w-10 bg-primary/80 rounded-t-lg transition-all"
                  style={{ height: `${stat.value * 1.5}px` }}
                />
              </div>
              <span className="text-xs text-gray-500 mt-2">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Suggested prompts */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
            Suggested Questions
          </p>
          {[
            "What are the key financial risks?",
            "Summarize customer concentration",
            "Show me the EBITDA trend",
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => setMessage(prompt)}
              className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <Paperclip className="h-5 w-5 text-gray-400" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <Mic className="h-5 w-5 text-gray-400" />
          </button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 rounded-lg"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
