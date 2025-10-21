"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Play, Zap, Code } from "lucide-react";

interface Command {
  input: string;
  output: string[];
  delay?: number;
}

const commands: Command[] = [
  {
    input: "whoami",
    output: ["Cloud and DevOps Engineer and Full Stack Engineer"],
  },
  {
    input: "ls skills/",
    output: [
      "python/     react/       node.js/     typescript/",
      "aws/        gcp/         azure/       docker/",
      "kubernetes/ jenkins/     mysql/       mongodb/"
    ],
  },
  {
    input: "cat experience.txt",
    output: [
      "1+ years building scalable applications",
      "15+ successful project deployments", 
      "Cloud infrastructure optimization expert",
      "Cloud and DevOps Engineer and Full Stack Engineer"
    ],
  },
  {
    input: "git log --oneline",
    output: [
      "a1b2c3d Fixed performance issues in React components",
      "e4f5g6h Implemented CI/CD pipeline with Jenkins",
      "i7j8k9l Added monitoring with Prometheus & Grafana",
      "m1n2o3p Deployed microservices on Kubernetes",
      "p4q5r6s Optimized database queries for better performance"
    ],
  },
  {
    input: "echo $PASSION",
    output: ["Building innovative solutions with cutting-edge technology"],
  }
];

export function InteractiveTerminal() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCommand, setCurrentCommand] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const typeCommand = async (command: string) => {
    setIsTyping(true);
    setCurrentCommand("");
    
    for (let i = 0; i <= command.length; i++) {
      setCurrentCommand(command.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setIsTyping(false);
  };

  const executeCommand = async (commandObj: Command) => {
    // Add input to output
    setOutput(prev => [...prev, `$ ${commandObj.input}`]);
    
    // Wait a bit then add output lines one by one
    await new Promise(resolve => setTimeout(resolve, 300));
    
    for (const line of commandObj.output) {
      setOutput(prev => [...prev, line]);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setOutput(prev => [...prev, ""]);
  };

  const runDemo = async () => {
    setIsRunning(true);
    setOutput([]);
    setCurrentCommandIndex(0);
    
    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i];
      setCurrentCommandIndex(i);
      
      await typeCommand(cmd.input);
      await new Promise(resolve => setTimeout(resolve, 500));
      await executeCommand(cmd);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentCommand("");
    }
    
    setIsRunning(false);
  };

  const clearTerminal = () => {
    setOutput([]);
    setCurrentCommand("");
    setCurrentCommandIndex(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <TerminalIcon className="w-4 h-4" />
              <span className="text-sm font-mono">portfolio-terminal</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              onClick={runDemo}
              disabled={isRunning}
              className="flex items-center gap-2 px-3 py-1 rounded bg-green-500/20 text-green-400 text-sm font-mono hover:bg-green-500/30 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-3 h-3" />
              {isRunning ? "Running..." : "Run Demo"}
            </motion.button>
            
            <motion.button
              onClick={clearTerminal}
              className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-sm font-mono hover:bg-red-500/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear
            </motion.button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 bg-black/50 min-h-96 font-mono text-sm">
          <div className="text-green-400 mb-4">
            Welcome to my interactive portfolio terminal! 🚀
          </div>
          
          {/* Output */}
          <div className="space-y-1 mb-4">
            <AnimatePresence>
              {output.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${
                    line.startsWith('$') 
                      ? 'text-blue-400 font-bold' 
                      : line === '' 
                        ? 'h-4' 
                        : 'text-green-300'
                  }`}
                >
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Current Command Line */}
          {isRunning && (
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">$</span>
              <span className="text-white">{currentCommand}</span>
              <motion.span
                animate={{ opacity: showCursor ? 1 : 0 }}
                className="inline-block w-2 h-5 bg-green-400 ml-1"
              />
            </div>
          )}
          
          {!isRunning && output.length === 0 && (
            <div className="text-white/50">
              Click "Run Demo" to see an interactive demonstration of my skills and experience!
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Typing Animation Component
export function TypingAnimation({ 
  texts, 
  className = "", 
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000 
}: {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % texts.length);
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts, speed, deleteSpeed, pauseDuration]);

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        className="inline-block w-0.5 h-6 bg-current ml-1"
      />
    </span>
  );
}