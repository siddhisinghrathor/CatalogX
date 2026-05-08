import { GoogleGenAI } from '@google/genai';

// Initialize the API with the key from our environment variables
// We use import.meta.env in Vite instead of process.env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Only initialize if we have a key, preventing crashes on first load
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Core function to communicate with Gemini API
 * @param {string} prompt - The user's input or question
 * @param {string} systemInstruction - Instructions guiding the AI's persona
 * @returns {Promise<string>} The AI's response text
 */
export const getGeminiResponse = async (prompt, systemInstruction = "You are a helpful AI assistant for FlexiCatalog, a premium product catalog.") => {
  if (!ai) {
    console.warn("No Gemini API key found. Returning mock response.");
    return "This is a mock AI response. Please add VITE_GEMINI_API_KEY to your .env.local file.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7, // 0.7 gives a good balance of creativity and accuracy
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Sorry, I encountered an error while thinking. Please try again.";
  }
};
