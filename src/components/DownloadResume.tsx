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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-green-500/50 transition-shadow text-sm sm:text-base"
    >
      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="whitespace-nowrap">Download Resume</span>
    </motion.button>
  );
}
