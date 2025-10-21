"use client";
import { motion } from "framer-motion";
import { Send, Mail, User as UserIcon, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setStatus("loading");
    
    // Simulate API call - replace with actual EmailJS or API endpoint
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section id="contact" className="w-full max-w-4xl mx-auto py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4"
        >
          <Mail className="w-4 h-4 text-pink-400" />
          <span className="text-sm font-medium text-pink-400 uppercase tracking-wider">Get In Touch</span>
        </motion.div>
        <h3 className="text-4xl sm:text-5xl font-bold gradient-text mb-3">Contact Me</h3>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Have a project in mind or just want to chat? Drop me a message!
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="glass-card rounded-2xl p-8 space-y-6"
      >
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-foreground/80">
            Name
          </label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border ${
                errors.name ? "border-red-500" : "border-white/10"
              } focus:border-purple-500 focus:outline-none transition-colors text-foreground`}
              placeholder="Your name"
              disabled={status === "loading"}
            />
          </div>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.name}
            </motion.p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-foreground/80">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border ${
                errors.email ? "border-red-500" : "border-white/10"
              } focus:border-purple-500 focus:outline-none transition-colors text-foreground`}
              placeholder="your.email@example.com"
              disabled={status === "loading"}
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-foreground/80">
            Message
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border ${
                errors.message ? "border-red-500" : "border-white/10"
              } focus:border-purple-500 focus:outline-none transition-colors text-foreground resize-none`}
              placeholder="Tell me about your project or just say hi!"
              disabled={status === "loading"}
            />
          </div>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.message}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={status === "loading" || status === "success"}
          whileHover={status === "idle" || status === "error" ? { scale: 1.02 } : {}}
          whileTap={status === "idle" || status === "error" ? { scale: 0.98 } : {}}
          className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
            status === "success"
              ? "bg-green-500/20 text-green-400 border border-green-500/50"
              : status === "error"
              ? "bg-red-500/20 text-red-400 border border-red-500/50"
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50"
          }`}
        >
          {status === "loading" && (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Sending...</span>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Message Sent!</span>
            </>
          )}
          {status === "error" && (
            <>
              <AlertCircle className="w-5 h-5" />
              <span>Failed. Try again?</span>
            </>
          )}
          {status === "idle" && (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </motion.form>
    </section>
  );
}
