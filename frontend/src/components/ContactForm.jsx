import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        toast({
          title: "Message Sent!",
          description: result.message,
          className: "bg-green-500 text-white border-green-600",
        });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or use email directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="gaming-card text-center max-w-md mx-auto">
        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
        <p className="text-slate-300 mb-6">
          Thank you for reaching out! I'll get back to you soon.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-gaming-outline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="gaming-card max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Mail className="h-8 w-8 text-green-400 mr-3" />
        <h3 className="text-2xl font-semibold text-white">Get In Touch</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={100}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            minLength={5}
            maxLength={200}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors"
            placeholder="What would you like to discuss?"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={2000}
            rows={6}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors resize-none"
            placeholder="Tell me about your project, collaboration idea, or any questions you have..."
          />
          <div className="text-right text-xs text-slate-400 mt-1">
            {formData.message.length}/2000 characters
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-gaming flex-1 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send Message
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
            className="btn-gaming-ghost"
          >
            Clear Form
          </button>
        </div>
      </form>
      
      <div className="mt-6 pt-6 border-t border-slate-600">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-slate-400">
            I typically respond within 24-48 hours. For urgent inquiries, feel free to reach out directly via email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;