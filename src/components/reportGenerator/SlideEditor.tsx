import { useState } from "react";
import { ReportSlide, SlideAmendment } from "@/types/reportGenerator";
import { SlidePreview } from "./SlidePreview";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Wand2,
  Presentation,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TonyFace } from "@/components/TonyFace";

interface SlideEditorProps {
  slides: ReportSlide[];
  selectedSlideId: string | null;
  amendments: SlideAmendment[];
  onSelectSlide: (slideId: string) => void;
  onApplyAmendment: (amendment: SlideAmendment) => void;
  onUpdateSlide: (slideId: string, updates: Partial<ReportSlide>) => void;
}

export function SlideEditor({
  slides,
  selectedSlideId,
  amendments,
  onSelectSlide,
  onApplyAmendment,
  onUpdateSlide,
}: SlideEditorProps) {
  const [chatInput, setChatInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{
    role: "user" | "assistant";
    content: string;
    amendment?: SlideAmendment;
  }>>([
    {
      role: "assistant",
      content: "I can help you refine these slides. Select a slide and tell me what changes you'd like to make - I'll update the content for you.",
    },
  ]);

  const selectedSlide = slides.find(s => s.id === selectedSlideId);
  const currentSlideIndex = slides.findIndex(s => s.id === selectedSlideId);

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      onSelectSlide(slides[currentSlideIndex - 1].id);
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      onSelectSlide(slides[currentSlideIndex + 1].id);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !selectedSlide) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsProcessing(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate a mock amendment based on user input
    const mockAmendment: SlideAmendment = {
      id: `amend-${Date.now()}`,
      slideId: selectedSlide.id,
      type: "text",
      description: userMessage,
      newValue: generateMockResponse(userMessage, selectedSlide),
      status: "pending",
    };

    setChatMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: `I've prepared an update for "${selectedSlide.title}". Review the change below and click Apply to update the slide.`,
        amendment: mockAmendment,
      },
    ]);
    setIsProcessing(false);
  };

  const handleApplyAmendment = (amendment: SlideAmendment) => {
    const updatedAmendment = { ...amendment, status: "applied" as const, appliedAt: new Date() };
    onApplyAmendment(updatedAmendment);
    
    // Update the slide based on amendment
    if (selectedSlide) {
      if (amendment.type === "text" && selectedSlide.content.bullets) {
        const updatedBullets = [...selectedSlide.content.bullets];
        // Add or modify based on the amendment
        if (amendment.newValue.includes("Add:")) {
          updatedBullets.push(amendment.newValue.replace("Add: ", ""));
        } else {
          updatedBullets[0] = amendment.newValue;
        }
        onUpdateSlide(selectedSlide.id, {
          content: { ...selectedSlide.content, bullets: updatedBullets },
        });
      }
    }

    setChatMessages(prev => 
      prev.map(msg => 
        msg.amendment?.id === amendment.id 
          ? { ...msg, amendment: updatedAmendment }
          : msg
      )
    );
  };

  return (
    <div className="flex h-full gap-6">
      {/* Slide Thumbnails Sidebar */}
      <div className="w-52 flex-shrink-0 flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-4 flex-shrink-0">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Layers className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Slides</h4>
            <p className="text-[10px] text-muted-foreground">{slides.length} total</p>
          </div>
        </div>
        
        <ScrollArea className="flex-1 min-h-0">
          <div className="space-y-3 p-2 pr-8">
            {slides.map((slide, idx) => (
              <div 
                key={slide.id} 
                className="relative group"
              >
                {/* Slide Number */}
                <div className={cn(
                  "absolute -left-1 top-1/2 -translate-y-1/2 -translate-x-full w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  slide.id === selectedSlideId 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
                )}>
                  {idx + 1}
                </div>
                
                <SlidePreview
                  slide={slide}
                  isSelected={slide.id === selectedSlideId}
                  onClick={() => onSelectSlide(slide.id)}
                  isThumbnail
                  slideNumber={idx + 1}
                  totalSlides={slides.length}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Slide View */}
      <div className="flex-1 flex flex-col min-h-0">
        {selectedSlide ? (
          <>
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevSlide}
                  disabled={currentSlideIndex === 0}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                  <Presentation className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">
                    Slide {currentSlideIndex + 1} of {slides.length}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextSlide}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1 px-2.5 py-1">
                  <span className="text-[10px] uppercase text-muted-foreground">Type:</span>
                  <span className="text-xs font-medium">{selectedSlide.type}</span>
                </Badge>
                {selectedSlide.themes.length > 0 && (
                  <Badge className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    <Sparkles className="h-3 w-3" />
                    {selectedSlide.themes.length} themes
                  </Badge>
                )}
              </div>
            </div>

            {/* Slide Preview Canvas */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200/50 rounded-xl p-8 min-h-0">
              <div className="w-full max-w-4xl">
                <SlidePreview
                  slide={selectedSlide}
                  isSelected={false}
                  onClick={() => {}}
                  slideNumber={currentSlideIndex + 1}
                  totalSlides={slides.length}
                />
              </div>
            </div>
          </>
        ) : (
          <Card className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-1">No Slide Selected</h3>
              <p className="text-sm text-muted-foreground">
                Select a slide from the left panel to preview and edit
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* AI Chat Panel */}
      <div className="w-80 flex-shrink-0 flex flex-col min-h-0">
        <Card className="flex-1 flex flex-col overflow-hidden bg-white shadow-lg">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center gap-3 bg-gradient-to-r from-primary/5 to-purple-500/5">
            <div className="relative">
              <TonyFace size="small" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">AI Slide Editor</h4>
              <p className="text-[10px] text-muted-foreground">Describe changes to make</p>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4 min-h-0">
            <div className="space-y-4">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[90%] rounded-2xl px-4 py-2.5",
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-br-md" 
                      : "bg-gray-100 rounded-bl-md"
                  )}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    
                    {msg.amendment && (
                      <div className="mt-3 p-3 bg-white rounded-xl border shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase font-medium text-muted-foreground">
                            Proposed Change
                          </span>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-[9px] px-1.5 py-0",
                              msg.amendment.status === "applied" 
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            )}
                          >
                            {msg.amendment.status === "applied" ? (
                              <><CheckCircle2 className="h-2.5 w-2.5 mr-1" /> Applied</>
                            ) : (
                              <><Clock className="h-2.5 w-2.5 mr-1" /> Pending</>
                            )}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-foreground mb-3 leading-relaxed">
                          {msg.amendment.newValue}
                        </p>
                        
                        {msg.amendment.status === "pending" && (
                          <Button
                            size="sm"
                            className="w-full h-8 text-xs gap-1.5"
                            onClick={() => handleApplyAmendment(msg.amendment!)}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Apply Change
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-gray-50/50">
            <div className="relative">
              <Textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={selectedSlide ? "Describe what to change..." : "Select a slide first"}
                disabled={!selectedSlide || isProcessing}
                className="resize-none text-sm min-h-[80px] pr-12 bg-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                size="icon"
                className="absolute bottom-2 right-2 h-8 w-8 rounded-lg"
                onClick={handleSendMessage}
                disabled={!selectedSlide || !chatInput.trim() || isProcessing}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function generateMockResponse(userInput: string, slide: ReportSlide): string {
  const input = userInput.toLowerCase();
  
  if (input.includes("add") || input.includes("include")) {
    return "Add: " + userInput.replace(/add|include/gi, "").trim().charAt(0).toUpperCase() + 
           userInput.replace(/add|include/gi, "").trim().slice(1);
  }
  
  if (input.includes("change") || input.includes("update") || input.includes("modify")) {
    return "Updated: " + slide.title + " - reflecting requested changes";
  }
  
  if (input.includes("remove") || input.includes("delete")) {
    return "Content removed as requested";
  }
  
  return "Refined content based on your feedback: " + userInput;
}
