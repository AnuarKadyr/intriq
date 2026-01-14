import { useState, useEffect, useRef } from "react";
import { X, Send, TrendingUp, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickInsightChips } from "./QuickInsightChips";

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
  "which sku or product had the best performance this period?": `**Top Performer: Enterprise Analytics Add-on (SKU-006)**

This product achieved exceptional performance with **+35.5% total growth**:

📈 **Price Growth: +15.3%**
- Successfully repositioned as premium analytics solution
- New AI-powered features justified price increase from £5,900 to £6,800

📊 **Volume Growth: +17.7%**
- Unit sales grew from 525 to 618 units
- Strong demand from European enterprise customers

🎯 **Key Success Factors:**
1. Data analytics trend driving demand
2. Competitive differentiation through AI capabilities
3. High customer retention (92% renewal rate)

**Runner-up: Professional Services Tier 1 (SKU-004)**
- +33.3% total growth
- Premium consulting rates increased 19.4%
- Volume grew 11.7% from expanded service team`,
  "what product or region showed the biggest decline?": `**Analysis shows no significant declines, but here are the weakest performers:**

📉 **Slowest Growth Product: Core Platform License (SKU-005)**
- Only +2.0% growth (£100K increase)
- Price: +1.5%, Volume: +0.5%
- **Reason:** Mature product at market saturation

📍 **Slowest Growth Region: Asia Pacific**
- +8.0% growth (lowest among regions)
- Price gains limited to +3.1% due to competitive pressure
- Volume growth of +4.9% from expansion partially offset

**Potential Concerns:**

⚠️ **Starter Package Basic (SKU-003)** took a -3.3% price hit
- Aggressive discounting to drive APAC volume (+27.2%)
- Trade-off appears positive given overall +23.1% revenue growth

**Recommendation:** Monitor Core Platform License for potential refresh or sunset strategy.`,
  "how did product mix changes affect overall revenue?": `**Mix Impact Analysis: +0.7% (+£0.9M contribution)**

The product and geographic mix shifts had a modest positive impact:

📦 **Product Mix Effect:**
- Shift toward Premium Solutions (+2.3pp of revenue share)
- Premium products carry 12% higher margin than core products
- Services mix increased from 8.9% to 9.8% of revenue

🌍 **Geographic Mix Effect:**
- APAC grew to 17% of revenue (from 17.4% prior year)
- North America maintained 44% share
- Slight mix away from higher-margin Europe (-0.5pp)

📊 **Net Mix Calculation:**
| Factor | Impact |
|--------|--------|
| Product mix | +1.1% |
| Geographic mix | -0.4% |
| **Net Mix** | **+0.7%** |

**Key Insight:** Premium product migration is driving positive mix, offsetting slight geographic dilution from APAC expansion focus.`,
  "which geography performed best and why?": `**Best Performing Region: North America (+13.2% growth)**

📍 **Revenue: £62.5M** (from £55.2M)
- Contributed 45% of total growth
- 128 SKUs analyzed

**Growth Breakdown:**
| Factor | Change |
|--------|--------|
| Price | +6.8% |
| Volume | +5.4% |
| Mix | +1.0% |

🏆 **Success Drivers:**

1. **Pricing Power (+6.8%)**
   - Premium product launches enabled price increases
   - Reduced promotional activity improved realization
   - Enterprise segment led with +8.2% pricing

2. **Distribution Expansion (+5.4% volume)**
   - 3 new retail partnerships added
   - E-commerce channel grew 22%

3. **Premium Mix Shift (+1.0%)**
   - Enterprise adoption increased 18%
   - Services attach rate improved to 34%

**Runner-up: Latin America (+11.1%)**
- Inflationary environment enabled +8.2% price increases`,
  "which products drove the most price-based growth?": `**Top Price-Led Growth Products:**

🥇 **#1: Professional Services Tier 1 (SKU-004)**
- Price change: **+19.4%**
- Revenue from pricing: +£465K
- Hourly rate increased £155 → £185
- High demand for consulting expertise

🥈 **#2: Enterprise Analytics Add-on (SKU-006)**
- Price change: **+15.3%**
- Revenue from pricing: +£385K
- New AI features justified premium
- Zero customer churn from price increase

🥉 **#3: Enterprise Platform Pro (SKU-001)**
- Price change: **+11.6%**
- Revenue from pricing: +£520K
- Annual subscription: £11,200 → £12,500
- AI capabilities driving value perception

📊 **Price Leadership by Category:**
| Category | Avg Price Change |
|----------|------------------|
| Services & Support | +12.2% |
| Premium Solutions | +8.5% |
| Core Products | +3.2% |
| Entry Level | +2.1% |

**Key Insight:** Premium and services segments demonstrate strongest pricing power, with customers willing to pay for differentiated value.`,
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

  const handleQuickInsight = (question: string) => {
    handleSendMessage(question);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-[57px] right-0 h-[calc(100%-57px)] w-[400px] bg-card border-l border-border flex flex-col shadow-2xl z-30 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
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

      {/* Quick Insight Chips */}
      {messages.length === 0 && (
        <div className="px-4 py-3 border-b border-border/50">
          <QuickInsightChips onChipClick={handleQuickInsight} />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Sparkles className="h-10 w-10 mb-3 text-primary/50" />
            <p className="text-sm">Ask questions about your price-volume analysis</p>
            <p className="text-xs mt-1 text-muted-foreground/70">Or use the quick insights above</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="p-2 rounded-lg bg-primary/10 h-fit">
                <TrendingUp className="h-4 w-4 text-primary" />
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
            <div className="p-2 rounded-lg bg-primary/10 h-fit">
              <TrendingUp className="h-4 w-4 text-primary" />
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

      {/* Inline Quick Chips when there are messages */}
      {messages.length > 0 && (
        <div className="px-4 py-2 border-t border-border/50 bg-muted/30">
          <QuickInsightChips onChipClick={handleQuickInsight} />
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about price-volume data..."
            className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
