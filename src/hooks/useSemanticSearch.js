import { useState, useEffect } from 'react';
import { getGeminiResponse } from '../services/ai';
import productsData from '../data/products.json';

// We debounce the search to avoid hitting the API on every keystroke
export const useSemanticSearch = (searchTerm) => {
  const [results, setResults] = useState(productsData.map(p => p.id));
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchTerm.trim()) {
        setResults(productsData.map(p => p.id));
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      
      try {
        const prompt = `
          Analyze this search query: "${searchTerm}"
          And map it to the IDs of the best matching products from this list:
          ${JSON.stringify(productsData.map(p => ({id: p.id, name: p.itemname, category: p.category, props: p.itemprops})))}
          
          Return ONLY a JSON array of string IDs that match the intent of the query. Do not use markdown blocks. Just the array.
          Example: ["kia-sonet", "tesla-model-3"]
        `;
        
        const response = await getGeminiResponse(prompt, "You are a product search engine returning JSON arrays of IDs.");
        
        // Clean the response to ensure it's parseable JSON
        const cleanedResponse = response.replace(/```json/g, '').replace(/```/g, '').trim();
        const matchedIds = JSON.parse(cleanedResponse);
        
        if (Array.isArray(matchedIds)) {
          setResults(matchedIds);
        } else {
          // Fallback to exact match if API returns bad data
          setResults(productsData.filter(p => p.itemname.toLowerCase().includes(searchTerm.toLowerCase())).map(p => p.id));
        }
      } catch (error) {
        console.error("Semantic search failed, falling back to exact match.", error);
        setResults(productsData.filter(p => p.itemname.toLowerCase().includes(searchTerm.toLowerCase())).map(p => p.id));
      } finally {
        setIsSearching(false);
      }
    }, 800); // 800ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return { results, isSearching };
};
