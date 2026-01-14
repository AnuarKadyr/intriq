import { useState } from "react";
import { Mail, Copy, Send, Sparkles, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IRTItem } from "@/types/irt";
import { toast } from "sonner";

interface EmailDraftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: IRTItem[];
  projectName?: string;
}

export function EmailDraftDialog({ 
  open, 
  onOpenChange, 
  items,
  projectName = "Project Aurora"
}: EmailDraftDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState(`${projectName} - Outstanding Information Request Items`);
  
  const generateEmailBody = () => {
    const outstandingItems = items.filter(i => i.status === "Outstanding");
    const groupedBySubject = outstandingItems.reduce((acc, item) => {
      if (!acc[item.subject]) acc[item.subject] = [];
      acc[item.subject].push(item);
      return acc;
    }, {} as Record<string, IRTItem[]>);

    let body = `Dear Team,\n\nI hope this email finds you well.\n\n`;
    body += `As part of our ongoing due diligence process for ${projectName}, we would like to follow up on the following ${outstandingItems.length} outstanding information requests:\n\n`;
    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    Object.entries(groupedBySubject).forEach(([subject, subjectItems]) => {
      body += `▸ ${subject.toUpperCase()}\n`;
      body += `─────────────────────────────\n`;
      subjectItems.forEach((item, idx) => {
        body += `  ${item.number}. ${item.request}\n`;
        if (item.dataroomRef) {
          body += `     └ Data Room Ref: ${item.dataroomRef}\n`;
        }
        if (idx < subjectItems.length - 1) body += `\n`;
      });
      body += `\n`;
    });

    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    body += `SUMMARY: ${outstandingItems.length} items outstanding across ${Object.keys(groupedBySubject).length} categories.\n\n`;
    body += `Could you please provide the above items at your earliest convenience? If any items are not available or require clarification, please let us know.\n\n`;
    body += `We appreciate your cooperation and look forward to your response.\n\n`;
    body += `Best regards`;

    return body;
  };

  const [emailBody, setEmailBody] = useState(generateEmailBody());

  const handleRegenerate = async () => {
    setIsGenerating(true);
    // Simulate AI regeneration
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEmailBody(generateEmailBody());
    setIsGenerating(false);
    toast.success("Email regenerated");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody);
    toast.success("Email copied to clipboard");
  };

  const handleSend = () => {
    // In production, this would integrate with email service
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
    toast.success("Opening email client...");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Draft Client Email
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-3 text-sm">
            <p className="text-gray-600">
              Drafting email for <strong>{items.length}</strong> selected items 
              (<strong>{items.filter(i => i.status === "Outstanding").length}</strong> outstanding)
            </p>
          </div>

          {/* Email Fields */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="recipient">To</Label>
              <Input
                id="recipient"
                placeholder="client@company.com"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="body">Email Body</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="gap-1.5 text-primary"
                >
                  {isGenerating ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5" />
                  )}
                  Regenerate with AI
                </Button>
              </div>
              <Textarea
                id="body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCopy} className="gap-2">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button onClick={handleSend} className="gap-2">
            <Send className="h-4 w-4" />
            Open in Email Client
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
