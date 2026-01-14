import { useState, useEffect, useRef } from "react";
import { X, Send, TrendingUp, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface PriceVolumeChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

const mockResponses: Record<string, string> = {
  "update data for 2025 - how did the numbers change from 2024": `Based on the 2025 data update compared to 2024:

**Overall Revenue Change: +£3.2M (+8.2%)**

**Key Changes:**

📈 **Price Impact: +£1.8M (+4.6%)**
- Average price increase of 4.2% across all SKUs
- Premium Solutions saw the highest price gains (+6.1%)
- North America led with +5.2% price increases

📊 **Volume Impact: +£1.1M (+2.8%)**
- Unit sales increased by 45,000 units
- Core Products drove most volume growth (+8.3%)
- APAC region showed strongest volume gains (+12.1%)

🔄 **Mix Impact: +£0.3M (+0.8%)**
- Shift toward higher-margin Premium products
- Geographic mix favorable with APAC expansion

**Top 3 SKU Contributors:**
1. **SKU-001 Premium Analytics**: +£420K (Price +7.2%)
2. **SKU-015 Cloud Platform**: +£380K (Volume +15.3%)
3. **SKU-008 Enterprise Suite**: +£295K (Mixed drivers)

Would you like me to drill down into any specific geography or product group?`,
};

export function PriceVolumeChatPanel({ isOpen, onClose, initialQuestion }: PriceVolumeChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasProcessedInitial = useRef(false);

  useEffect(() => {
    if (initialQuestion && !hasProcessedInitial.current && isOpen) {
      hasProcessedInitial.current = true;
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responseContent = mockResponses[text.toLowerCase()] || 
      `I've analyzed the price-volume data for your query: "${text}"

Based on the current dataset:
- Total revenue change: +£3.2M (+8.2%)
- Price contributed: 56% of the increase
- Volume contributed: 35% of the increase  
- Mix effects: 9% of the increase

The analysis shows strong pricing power with volume holding steady. Would you like me to explore any specific dimension in more detail?`;

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant", 
      content: responseContent,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-[57px] right-0 h-[calc(100%-57px)] w-[400px] bg-card border-l border-border flex flex-col shadow-2xl z-30 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-pink-500/10">
            <TrendingUp className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <h3 className="font-semibold">Price Volume Assistant</h3>
            <p className="text-xs text-muted-foreground">Ask questions about your analysis</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Sparkles className="h-10 w-10 mb-3 text-pink-500/50" />
            <p className="text-sm">Ask questions about your price-volume analysis</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="p-2 rounded-lg bg-pink-500/10 h-fit">
                <TrendingUp className="h-4 w-4 text-pink-500" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-lg p-3 ${
              msg.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
            {msg.role === 'user' && (
              <div className="p-2 rounded-lg bg-primary/10 h-fit">
                <User className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-pink-500/10 h-fit">
              <TrendingUp className="h-4 w-4 text-pink-500" />
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about price-volume data..."
            className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
          />
          <Button type="submit" size="icon" className="bg-pink-500 hover:bg-pink-600">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
