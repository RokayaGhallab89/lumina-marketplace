import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getShoppingAdvice = async (userQuery: string, currentContext: string, currentProducts: Product[]): Promise<{ text: string; productIds: number[] }> => {
  try {
    const productCatalog = currentProducts.map(p => 
      `ID: ${p.id}, Name: ${p.title}, Price: $${p.price}, Category: ${p.category}, Description: ${p.description}`
    ).join('\n');

    const systemInstruction = `
      You are a helpful and enthusiastic shopping assistant for "Lumina Shop".
      Your goal is to help users find products from our catalog.
      
      Here is our Product Catalog:
      ${productCatalog}
      
      Rules:
      1. If the user asks for a recommendation, suggest products from the catalog that match their needs.
      2. Return your response in JSON format strictly.
      3. The JSON should have two fields:
         - "response": A friendly text message to the user.
         - "recommended_ids": An array of product IDs (numbers) that you recommend. If none, return empty array.
      4. Keep the text response concise (under 50 words) and persuasive.
      5. If the user greets you, just greet back and ask how you can help.
    `;

    const model = 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { role: 'user', parts: [{ text: `Context: ${currentContext}\nUser Query: ${userQuery}` }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    const parsed = JSON.parse(responseText);
    
    return {
      text: parsed.response || "I'm having trouble thinking right now, but feel free to browse our catalog!",
      productIds: parsed.recommended_ids || []
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "I'm currently offline, but please check out our latest deals!",
      productIds: []
    };
  }
};