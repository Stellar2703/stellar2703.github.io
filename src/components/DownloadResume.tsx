"use client";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { downloadPDF } from "@/lib/downloadResume";

export function DownloadResume() {
  const handleDownload = () => {
    downloadPDF();
  };

  return (
    <motion.button
      onClick={handleDownload}
      whileTap={{ scale: 0.98 }}
      className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-foreground/5 font-medium flex items-center gap-2 transition-colors text-sm sm:text-base shadow-sm"
    >
      <Download className="w-4 h-4" />
      <span className="whitespace-nowrap">Download Resume</span>
    </motion.button>
  );
}
