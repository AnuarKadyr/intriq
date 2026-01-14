// Real file type icons using actual brand logos

import pdfIcon from "@/assets/icon-pdf.svg";
import excelIcon from "@/assets/icon-excel.svg";
import wordIcon from "@/assets/icon-word.svg";
import { File } from "lucide-react";

interface IconProps {
  className?: string;
}

export const PDFIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <img src={pdfIcon} alt="PDF" className={className} />
);

export const ExcelIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <img src={excelIcon} alt="Excel" className={className} />
);

export const WordIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <img src={wordIcon} alt="Word" className={className} />
);

export const GenericFileIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <File className={`${className} text-gray-400`} />
);

export const getFileTypeIcon = (type: string, className?: string) => {
  const lowerType = type.toLowerCase();
  
  if (lowerType.includes('pdf')) {
    return <PDFIcon className={className} />;
  }
  if (lowerType.includes('excel') || lowerType.includes('xlsx') || lowerType.includes('xls') || lowerType.includes('macro')) {
    return <ExcelIcon className={className} />;
  }
  if (lowerType.includes('word') || lowerType.includes('doc')) {
    return <WordIcon className={className} />;
  }
  return <GenericFileIcon className={className} />;
};
