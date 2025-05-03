"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Mock submission
    toast.success("Message sent! 🚀");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <motion.section
      className="max-w-2xl mx-auto mt-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
      <p className="text-gray-400 mb-8">
        Fill out the form and I’ll get back to you as soon as I can.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Your name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="Your email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Textarea
          placeholder="Your message"
          name="message"
          rows={6}
          value={form.message}
          onChange={handleChange}
        />
        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </motion.section>
  );
}
