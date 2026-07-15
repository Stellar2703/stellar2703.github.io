"use client";
import { motion } from "framer-motion";
import { Send, Mail, User as UserIcon, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

// ── Formspree endpoint ─────────────────────────────────────────────────────────
// Create a free account at https://formspree.io and replace the ID below.
// e.g. if your form URL is https://formspree.io/f/xabc1234  →  use "xabc1234"
const FORMSPREE_ID = "xabc1234"; // ← REPLACE with your Formspree form ID

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim())    e.name    = "Name is required";
    if (!formData.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email address";
    if (!formData.message.trim()) e.message = "Message is required";
    else if (formData.message.trim().length < 10)                 e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name:    formData.name,
          email:   formData.email,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <section id="contact" className="w-full max-w-2xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider badge-indigo mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">Contact</h2>
        <p className="text-muted max-w-md mx-auto text-sm sm:text-base leading-relaxed">
          Have a project in mind or want to talk? Reach me directly at{" "}
          <a href="mailto:shashwathvr@gmail.com" className="text-accent font-semibold hover:underline">
            shashwathvr@gmail.com
          </a>{" "}
          or on{" "}
          <a href="https://linkedin.com/in/stellar2703" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
            LinkedIn
          </a>
          , or fill out the form — I&apos;ll reply within 24 hours.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="border border-border border-t-2 border-t-indigo-500 bg-card rounded-xl p-6 sm:p-8 space-y-6 shadow-sm"
      >
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Name</label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
            <input
              type="text" id="name" name="name"
              value={formData.name} onChange={handleChange}
              disabled={status === "loading"}
              placeholder="Your name"
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${errors.name ? "border-red-500" : "border-border"} bg-background text-foreground text-sm focus:border-indigo-400 focus:outline-none transition-colors`}
            />
          </div>
          {errors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
            <input
              type="email" id="email" name="email"
              value={formData.email} onChange={handleChange}
              disabled={status === "loading"}
              placeholder="your.email@example.com"
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${errors.email ? "border-red-500" : "border-border"} bg-background text-foreground text-sm focus:border-indigo-400 focus:outline-none transition-colors`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-foreground/80">Message</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted/60" />
            <textarea
              id="message" name="message"
              value={formData.message} onChange={handleChange}
              rows={5} disabled={status === "loading"}
              placeholder="Tell me about your project or just say hello..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${errors.message ? "border-red-500" : "border-border"} bg-background text-foreground text-sm focus:border-indigo-400 focus:outline-none transition-colors resize-none`}
            />
          </div>
          {errors.message && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.message}</p>}
        </div>

        {/* Error banner */}
        {status === "error" && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Something went wrong. Please email me directly at <strong>shashwathvr@gmail.com</strong></span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            status === "success"
              ? "bg-green-600/10 text-green-600 border border-green-600/30"
              : status === "error"
              ? "bg-red-600/10 text-red-600 border border-red-600/30"
              : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-95 shadow-md"
          }`}
        >
          {status === "loading" && <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Sending...</span></>}
          {status === "success" && <><CheckCircle className="w-4 h-4" /><span>Message sent! I&apos;ll be in touch soon.</span></>}
          {status === "error"   && <><AlertCircle className="w-4 h-4" /><span>Failed — try emailing directly</span></>}
          {status === "idle"    && <><Send className="w-4 h-4" /><span>Send Message</span></>}
        </button>

        {/* Note about Formspree */}
        <p className="text-center text-[10px] text-muted/50">
          Form powered by Formspree · Your data is only used to respond to you
        </p>
      </motion.form>
    </section>
  );
}
