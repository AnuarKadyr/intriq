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
  Wand2
} from "lucide-react";
import { cn } from "@/lib/utils";

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
      content: "I can help you refine these slides. Select a slide and tell me what changes you'd like to make.",
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
        content: `I've prepared an update for "${selectedSlide.title}". Click "Apply" to update the slide.`,
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
    <div className="flex h-full gap-4">
      {/* Slide Thumbnails */}
      <div className="w-48 flex-shrink-0">
        <h4 className="text-sm font-medium text-foreground mb-3">Slides</h4>
        <ScrollArea className="h-[calc(100%-2rem)]">
          <div className="space-y-2 pr-2">
            {slides.map((slide, idx) => (
              <div key={slide.id} className="relative">
                <span className="absolute -left-5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">
                  {idx + 1}
                </span>
                <SlidePreview
                  slide={slide}
                  isSelected={slide.id === selectedSlideId}
                  onClick={() => onSelectSlide(slide.id)}
                  isThumbnail
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Slide View */}
      <div className="flex-1 flex flex-col">
        {selectedSlide ? (
          <>
            {/* Navigation */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevSlide}
                  disabled={currentSlideIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentSlideIndex + 1} / {slides.length}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextSlide}
                  disabled={currentSlideIndex === slides.length - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                {selectedSlide.themes.length} themes
              </Badge>
            </div>

            {/* Slide Preview */}
            <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-lg p-6">
              <div className="w-full max-w-3xl">
                <SlidePreview
                  slide={selectedSlide}
                  isSelected={false}
                  onClick={() => {}}
                />
              </div>
            </div>
          </>
        ) : (
          <Card className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Select a slide to preview and edit
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* AI Chat Panel */}
      <div className="w-80 flex-shrink-0 flex flex-col">
        <Card className="flex-1 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Wand2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">AI Assistant</h4>
              <p className="text-[10px] text-muted-foreground">Edit slides with AI</p>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-3">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[90%] rounded-lg p-2",
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}>
                    <p className="text-xs">{msg.content}</p>
                    
                    {msg.amendment && (
                      <div className="mt-2 p-2 bg-background rounded border">
                        <div className="flex items-center justify-between mb-1">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-[9px]",
                              msg.amendment.status === "applied" && "bg-emerald-50 text-emerald-700 border-emerald-200"
                            )}
                          >
                            {msg.amendment.status === "applied" ? (
                              <><CheckCircle2 className="h-2.5 w-2.5 mr-1" /> Applied</>
                            ) : (
                              <><Clock className="h-2.5 w-2.5 mr-1" /> Pending</>
                            )}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground mb-2">
                          {msg.amendment.newValue}
                        </p>
                        {msg.amendment.status === "pending" && (
                          <Button
                            size="sm"
                            className="w-full h-6 text-[10px]"
                            onClick={() => handleApplyAmendment(msg.amendment!)}
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
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
                  <div className="bg-muted rounded-lg p-2 flex items-center gap-2">
                    <RefreshCw className="h-3 w-3 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <Textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={selectedSlide ? "Describe changes..." : "Select a slide first"}
                disabled={!selectedSlide || isProcessing}
                className="resize-none text-xs min-h-[60px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <Button
              className="w-full mt-2 gap-1"
              size="sm"
              onClick={handleSendMessage}
              disabled={!selectedSlide || !chatInput.trim() || isProcessing}
            >
              <Send className="h-3 w-3" />
              Send
            </Button>
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
