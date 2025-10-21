"use client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Download, 
  Printer, 
  QrCode, 
  ExternalLink,
  Eye,
  Zap,
  Share2,
  X
} from "lucide-react";
import { useState } from "react";
import QRCodeLib from 'qrcode';

interface ResumeAction {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  action: () => void;
  description: string;
}

export function InteractiveResume() {
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateQR = async () => {
    setIsGeneratingQR(true);
    
    try {
      // Generate actual QR code
      const portfolioURL = window.location.origin;
      const qrCodeDataURL = await QRCodeLib.toDataURL(portfolioURL, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });

      setQrCodeData(qrCodeDataURL);
      setShowQRModal(true);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      alert('Failed to generate QR code. Please try again.');
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeData) {
      const link = document.createElement('a');
      link.href = qrCodeData;
      link.download = 'portfolio-qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Resume',
          text: 'Check out my professional resume',
          url: window.location.origin,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.origin);
      alert('Portfolio URL copied to clipboard!');
    }
  };

  const resumeActions: ResumeAction[] = [
    {
      id: 'download',
      label: 'Download PDF',
      icon: Download,
      color: 'from-blue-500 to-cyan-500',
      action: handleDownloadPDF,
      description: 'Get the latest PDF version'
    },
    {
      id: 'print',
      label: 'Print Resume',
      icon: Printer,
      color: 'from-green-500 to-teal-500',
      action: handlePrint,
      description: 'Print-optimized version'
    },
    {
      id: 'qr',
      label: 'Generate QR',
      icon: QrCode,
      color: 'from-purple-500 to-pink-500',
      action: handleGenerateQR,
      description: 'QR code for easy sharing'
    },
    {
      id: 'share',
      label: 'Share Link',
      icon: Share2,
      color: 'from-orange-500 to-red-500',
      action: handleShare,
      description: 'Share portfolio URL'
    }
  ];

  return (
    <section id="resume" className="w-full max-w-6xl mx-auto py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4"
        >
          <FileText className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Professional Resume</span>
        </motion.div>
        <h3 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">Interactive Resume</h3>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Multiple ways to access and share my professional experience
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {resumeActions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={action.action}
            >
              <div className="glass-card rounded-2xl p-6 text-center hover:holo-border transition-all duration-300">
                <motion.div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${action.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-full h-full text-white" />
                </motion.div>
                
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-400 transition-colors">
                  {action.label}
                </h4>
                <p className="text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors">
                  {action.description}
                </p>

                {/* Loading state for QR generation */}
                {action.id === 'qr' && isGeneratingQR && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3"
                  >
                    <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="glass-card rounded-2xl p-8"
      >
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
              className="text-3xl font-bold gradient-text mb-2"
            >
              1+
            </motion.div>
            <p className="text-foreground/60">Years Experience</p>
          </div>
          
          <div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
              className="text-3xl font-bold gradient-text mb-2"
            >
              15+
            </motion.div>
            <p className="text-foreground/60">Projects Completed</p>
          </div>
          
          <div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.6 }}
              className="text-3xl font-bold gradient-text mb-2"
            >
              20+
            </motion.div>
            <p className="text-foreground/60">Technologies Mastered</p>
          </div>
        </div>
      </motion.div>

      {/* Resume Preview Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <motion.button
          onClick={() => setShowPreview(!showPreview)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card holo-border hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye className="w-5 h-5" />
          <span>{showPreview ? 'Hide' : 'Preview'} Resume</span>
        </motion.button>

        {/* Resume Preview */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 glass-card rounded-2xl p-8 text-left overflow-hidden"
          >
            <div className="space-y-6">
              <div className="text-center border-b border-white/10 pb-6">
                <h4 className="text-2xl font-bold gradient-text mb-2">Professional Resume</h4>
                <p className="text-foreground/60">Cloud and DevOps Engineer and Full Stack Engineer</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="text-lg font-semibold text-foreground mb-3">Core Skills</h5>
                  <div className="space-y-2 text-sm text-foreground/70">
                    <div>• Python, React, Node.js, TypeScript</div>
                    <div>• AWS, GCP, Azure Cloud Platforms</div>
                    <div>• Docker, Kubernetes, CI/CD</div>
                    <div>• MySQL, MongoDB, Prometheus</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-lg font-semibold text-foreground mb-3">Experience Highlights</h5>
                  <div className="space-y-2 text-sm text-foreground/70">
                    <div>• 15+ successful project deployments</div>
                    <div>• Cloud infrastructure optimization</div>
                    <div>• Full-stack application development</div>
                    <div>• DevOps automation and monitoring</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-center text-sm text-foreground/60">
                  Download full resume for complete details and contact information
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowQRModal(false)}
          >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="glass-card rounded-2xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">📱 Scan QR Code</h3>
            <p className="text-foreground/60 mb-6">
              Scan this QR code to quickly access my portfolio on your mobile device
            </p>
            
            {qrCodeData && (
              <div className="bg-white p-4 rounded-xl mb-6 inline-block">
                <img 
                  src={qrCodeData} 
                  alt="Portfolio QR Code" 
                  className="w-48 h-48 mx-auto"
                />
              </div>
            )}
            
            <div className="text-sm text-foreground/50 mb-6 break-all">
              {typeof window !== 'undefined' ? window.location.origin : ''}
            </div>
            
            <div className="flex gap-3 justify-center">
              <motion.button
                onClick={downloadQRCode}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>
              
              <motion.button
                onClick={() => setShowQRModal(false)}
                className="px-4 py-2 glass-card rounded-lg text-foreground/70 hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}