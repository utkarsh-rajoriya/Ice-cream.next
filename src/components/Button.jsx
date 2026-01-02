"use client";
import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="px-6 py-3 text-white font-bold bg-white/20 hover:bg-white/30 border border-white/30 rounded-full shadow-lg transition-all backdrop-blur-md"
    >
      {text}
    </button>
  );
};

export default Button;