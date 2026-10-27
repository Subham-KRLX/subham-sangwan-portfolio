import { FileText } from "lucide-react";

export default function ResumeLink() {
  return (
    <a
      href="/Subham-Sangwan-Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View resume (PDF, opens in a new tab)"
      className="inline-flex min-h-11 items-center justify-center gap-1 sm:gap-2 px-1 sm:px-5 py-2.5 border-2 border-[#1a1a1a] text-center text-xs sm:text-sm font-bold uppercase tracking-normal whitespace-nowrap hover:bg-[#1a1a1a] hover:text-white transition-all"
    >
      <FileText size={16} aria-hidden="true" className="shrink-0" />
      View Résumé
    </a>
  );
}
