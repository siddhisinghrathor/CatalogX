import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, CheckCircle, Users } from 'lucide-react';
import { getGeminiResponse } from '../../services/ai';

const AIProductInsights = ({ product }) => {
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoading(true);
      try {
        const prompt = `
          Analyze this product: ${product.itemname}
          Category: ${product.category}
          Specs: ${JSON.stringify(product.itemprops)}
          
          Provide a short, punchy JSON response with:
          1. "summary": A compelling 2-sentence summary of why this is a great choice.
          2. "strengths": An array of 3 short bullet points (max 5 words each).
          3. "idealFor": A short description of the ideal user (e.g., "Hardcore Gamers").
          4. "score": An integer score out of 10 for overall premium value.
          
          Return ONLY valid JSON. No markdown ticks. Example:
          {"summary": "...", "strengths": ["...", "...", "..."], "idealFor": "...", "score": 9}
        `;
        
        const response = await getGeminiResponse(prompt, "You are a senior tech reviewer and product expert. Respond strictly in JSON.");
        const cleaned = response.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleaned);
        
        setInsights(data);
      } catch (error) {
        console.error("Failed to generate AI Insights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (product) {
      fetchInsights();
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="mt-10 p-6 rounded-3xl bg-white/5 border border-white/10 animate-pulse flex items-center justify-center h-48">
        <div className="flex flex-col items-center gap-4 text-white/50">
          <Sparkles className="animate-spin" size={24} />
          <span className="text-sm font-bold uppercase tracking-widest">Generating AI Insights...</span>
        </div>
      </div>
    );
  }

  if (!insights) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-black border border-primary/30 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Sparkles size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/20 rounded-xl text-primary">
            <Sparkles size={20} />
          </div>
          <h3 className="text-xl font-black tracking-tighter uppercase text-white">AI Analysis</h3>
        </div>

        <p className="text-lg text-slate-300 leading-relaxed mb-8">
          "{insights.summary}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest mb-4">
              <CheckCircle size={16} className="text-primary" /> Core Strengths
            </h4>
            <ul className="space-y-3">
              {insights.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest mb-2">
                <Users size={16} className="text-primary" /> Ideal For
              </h4>
              <p className="text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">{insights.idealFor}</p>
            </div>
            
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest mb-2">
                <Activity size={16} className="text-primary" /> Premium Score
              </h4>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-primary leading-none">{insights.score}</span>
                <span className="text-slate-500 font-bold mb-1">/ 10</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full mt-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(insights.score / 10) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIProductInsights;
