import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { getGeminiResponse } from '../../services/ai';
import productsData from '../../data/products.json';
import { useNavigate } from 'react-router-dom';

const AIRecommendations = ({ currentProduct }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const prompt = `
          Based on this product: "${currentProduct.itemname}" (Category: ${currentProduct.category}),
          Find 3 related products from this list (do NOT include ${currentProduct.id}):
          ${JSON.stringify(productsData.map(p => ({id: p.id, name: p.itemname, category: p.category})))}
          
          Return ONLY a JSON array of 3 object. Each object should have:
          - "id": The product ID
          - "reason": A short 5-word explanation of why it's recommended.
          
          Example: [{"id": "...", "reason": "..."}]
        `;
        
        const response = await getGeminiResponse(prompt, "You are a recommendation engine returning JSON arrays.");
        const cleaned = response.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleaned);
        
        // Map the IDs back to the full product objects
        const fullRecs = data.map(rec => ({
          ...productsData.find(p => p.id === rec.id),
          reason: rec.reason
        })).filter(p => p.id); // ensure it found a valid product
        
        setRecommendations(fullRecs);
      } catch (error) {
        console.error("Failed to generate AI Recommendations:", error);
        // Fallback: Just show 3 products from the same category
        const fallback = productsData
          .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
          .slice(0, 3)
          .map(p => ({ ...p, reason: '' }));
        setRecommendations(fallback);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentProduct) {
      fetchRecommendations();
    }
  }, [currentProduct]);

  if (isLoading) {
    return (
      <div className="mt-20 pt-10 border-t border-white/5 flex justify-center py-10">
        <Sparkles className="animate-spin text-white/20" size={32} />
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-20 pt-10 border-t border-white/5">
      <div className="flex items-center gap-3 mb-10">
        <Sparkles className="text-primary" size={24} />
        <h2 className="text-3xl font-black uppercase tracking-tighter">AI Recommended Matches</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((rec, idx) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate(`/product/${rec.id}`);
            }}
            className="group cursor-pointer glass p-4 rounded-[2rem] border border-white/5 hover:border-primary/30 transition-all hover:-translate-y-2"
          >
            <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-4 relative bg-black/40 border border-white/5 p-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
              <img 
                src={rec.image} 
                alt={rec.itemname} 
                className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700"
              />
              {/* Hover popup */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg tracking-wide">
                  Click to view details
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">{rec.itemname}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
