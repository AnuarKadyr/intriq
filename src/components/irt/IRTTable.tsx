import { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText,
  ChevronDown,
  ChevronRight,
  Upload,
  Mail,
  Filter,
  Search
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IRTItem, MatchedFile } from "@/types/irt";
import { cn } from "@/lib/utils";

interface IRTTableProps {
  items: IRTItem[];
  onUploadFiles: (itemId: string) => void;
  onDraftEmail: (selectedItems: IRTItem[]) => void;
  onUpdateStatus: (itemId: string, status: IRTItem["status"]) => void;
}

const statusConfig = {
  Outstanding: { 
    icon: AlertCircle, 
    color: "bg-amber-100 text-amber-700 border-amber-200",
    dotColor: "bg-amber-500"
  },
  Received: { 
    icon: Clock, 
    color: "bg-blue-100 text-blue-700 border-blue-200",
    dotColor: "bg-blue-500" 
  },
  Uploaded: { 
    icon: CheckCircle2, 
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-500"
  },
  "N/A": { 
    icon: FileText, 
    color: "bg-gray-100 text-gray-500 border-gray-200",
    dotColor: "bg-gray-400"
  },
};

const matchScoreConfig = {
  High: { color: "bg-emerald-100 text-emerald-700", dotColor: "bg-emerald-500" },
  Medium: { color: "bg-amber-100 text-amber-700", dotColor: "bg-amber-500" },
  Low: { color: "bg-rose-100 text-rose-700", dotColor: "bg-rose-500" },
};

export function IRTTable({ items, onUploadFiles, onDraftEmail, onUpdateStatus }: IRTTableProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const subjects = [...new Set(items.map(item => item.subject))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.request.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "all" || item.subject === filterSubject;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedIRTItems = items.filter(item => selectedItems.includes(item.id));
  const outstandingCount = items.filter(i => i.status === "Outstanding").length;
  const receivedCount = items.filter(i => i.status === "Received" || i.status === "Uploaded").length;

  return (
    <div className="space-y-4">
      {/* Stats Bar */}
      <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-sm text-gray-600">
              <strong className="text-gray-900">{outstandingCount}</strong> Outstanding
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-sm text-gray-600">
              <strong className="text-gray-900">{receivedCount}</strong> Received/Uploaded
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-sm text-gray-600">
              <strong className="text-gray-900">{items.length}</strong> Total Items
            </span>
          </div>
        </div>
        
        {selectedItems.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {selectedItems.length} selected
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDraftEmail(selectedIRTItems)}
              className="gap-2"
            >
              <Mail className="h-4 w-4" />
              Draft Email
            </Button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterSubject} onValueChange={setFilterSubject}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2 text-gray-400" />
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Outstanding">Outstanding</SelectItem>
            <SelectItem value="Received">Received</SelectItem>
            <SelectItem value="Uploaded">Uploaded</SelectItem>
            <SelectItem value="N/A">N/A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300"
                />
              </TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-16">#</TableHead>
              <TableHead className="w-32">Category</TableHead>
              <TableHead>Request</TableHead>
              <TableHead className="w-32">Status</TableHead>
              <TableHead className="w-24">Ref.</TableHead>
              <TableHead className="w-28">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => {
              const status = statusConfig[item.status];
              const StatusIcon = status.icon;
              const isExpanded = expandedItems.includes(item.id);
              const hasMatchedFiles = item.matchedFiles.length > 0;
              
              return (
                <>
                  <TableRow 
                    key={item.id}
                    className={cn(
                      "hover:bg-gray-50 transition-colors",
                      selectedItems.includes(item.id) && "bg-primary/5"
                    )}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        className="rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell>
                      {hasMatchedFiles && (
                        <button 
                          onClick={() => toggleExpand(item.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {item.number}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {item.subject}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 max-w-md">
                      <p className="line-clamp-2">{item.request}</p>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={item.status} 
                        onValueChange={(value) => onUpdateStatus(item.id, value as IRTItem["status"])}
                      >
                        <SelectTrigger className={cn("h-8 text-xs border", status.color)}>
                          <div className="flex items-center gap-1.5">
                            <div className={cn("w-2 h-2 rounded-full", status.dotColor)} />
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Outstanding">Outstanding</SelectItem>
                          <SelectItem value="Received">Received</SelectItem>
                          <SelectItem value="Uploaded">Uploaded</SelectItem>
                          <SelectItem value="N/A">N/A</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {item.dataroomRef || "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onUploadFiles(item.id)}
                        className="gap-1.5 text-gray-600 hover:text-primary"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Upload
                      </Button>
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded matched files */}
                  {isExpanded && hasMatchedFiles && (
                    <TableRow className="bg-gray-50/50">
                      <TableCell colSpan={8} className="p-0">
                        <div className="px-12 py-3 border-t border-gray-100">
                          <p className="text-xs font-medium text-gray-500 mb-2">
                            Matched Files ({item.matchedFiles.length})
                          </p>
                          <div className="space-y-2">
                            {item.matchedFiles.map((file) => {
                              const score = matchScoreConfig[file.matchScore];
                              return (
                                <div 
                                  key={file.id}
                                  className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-3"
                                >
                                  <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-gray-400" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        {file.fileName}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {file.matchRationale}
                                      </p>
                                    </div>
                                  </div>
                                  <Badge className={cn("gap-1", score.color)}>
                                    <div className={cn("w-1.5 h-1.5 rounded-full", score.dotColor)} />
                                    {file.matchScore} Match
                                  </Badge>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
