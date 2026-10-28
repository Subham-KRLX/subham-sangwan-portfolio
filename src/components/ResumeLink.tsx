import { FileText } from "lucide-react";

export default function ResumeLink() {
  return (
    <a
      href="/Subham-Sangwan-Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View resume (PDF, opens in a new tab)"
      className="hero-action gap-1 sm:gap-2 px-1 sm:px-5 py-2.5 text-center text-xs sm:text-sm font-bold uppercase tracking-normal whitespace-nowrap"
    >
      <FileText size={16} aria-hidden="true" className="shrink-0" />
      View Resume
    </a>
  );
}
