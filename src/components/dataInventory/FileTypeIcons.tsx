// Real branded file type icons as SVG components

export const PDFIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect x="3" y="2" width="18" height="20" rx="2" fill="#E53935" />
    <path d="M7 7h10M7 10h10M7 13h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <text x="12" y="19" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Arial">PDF</text>
  </svg>
);

export const ExcelIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect x="3" y="2" width="18" height="20" rx="2" fill="#1D6F42" />
    <path d="M7 8l4 4-4 4M11 8l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="12" y="19" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" fontFamily="Arial">XLS</text>
  </svg>
);

export const WordIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect x="3" y="2" width="18" height="20" rx="2" fill="#2B579A" />
    <path d="M7 7h10M7 10h10M7 13h10M7 16h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <text x="12" y="19" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" fontFamily="Arial">DOC</text>
  </svg>
);

export const PowerPointIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect x="3" y="2" width="18" height="20" rx="2" fill="#D24726" />
    <circle cx="12" cy="10" r="4" stroke="white" strokeWidth="1.5" />
    <text x="12" y="19" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" fontFamily="Arial">PPT</text>
  </svg>
);

export const GenericFileIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect x="3" y="2" width="18" height="20" rx="2" fill="#6B7280" />
    <path d="M7 8h10M7 11h10M7 14h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const getFileTypeIcon = (type: string, className?: string) => {
  const lowerType = type.toLowerCase();
  
  if (lowerType.includes('pdf')) {
    return <PDFIcon className={className} />;
  }
  if (lowerType.includes('excel') || lowerType.includes('xlsx') || lowerType.includes('xls')) {
    return <ExcelIcon className={className} />;
  }
  if (lowerType.includes('word') || lowerType.includes('doc')) {
    return <WordIcon className={className} />;
  }
  if (lowerType.includes('powerpoint') || lowerType.includes('ppt')) {
    return <PowerPointIcon className={className} />;
  }
  return <GenericFileIcon className={className} />;
};
