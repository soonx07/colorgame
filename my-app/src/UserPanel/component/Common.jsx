import React, { useState } from 'react';
import { Eye, EyeOff, Plus, MinusCircle, X } from 'lucide-react';

// Custom Dialog Components
export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed max-w-md mx-auto inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 animate-in fade-in slide-in-from-bottom-4 m-4">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className = "" }) => (
  <div className={`w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-yellow-500/20 ${className}`}>
    {children}
  </div>
);

export const DialogHeader = ({ children }) => (
  <div className="px-6 pt-6">{children}</div>
);

export const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-bold text-yellow-400">{children}</h2>
);

export const DialogDescription = ({ children }) => (
  <p className="mt-2 text-sm text-slate-400">{children}</p>
);

// Custom Input Component
export const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all ${className}`}
    {...props}
  />
);

// Custom Button Component
export const Button = ({ variant = "default", className = "", children, ...props }) => {
  const variants = {
    default: "bg-yellow-500 hover:bg-yellow-600 text-slate-900",
    outline: "border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-slate-900",
  };

  return (
    <button
      className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};