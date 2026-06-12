
import { GoogleGenAI } from "@google/genai";

export class GeminiConsultant {
  // We initialize the AI client only when needed to ensure we pick up the most current API key
  // and handle potential missing environment variables gracefully.
  private getAIClient() {
    // Safely check for process and API_KEY to avoid ReferenceError
    const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';
    return new GoogleGenAI({ apiKey: apiKey || '' });
  }

  async getConsultation(prompt: string): Promise<string> {
    try {
      const ai = this.getAIClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: `You are an expert IT Consultant for Sivenbrak Technologies Pvt Ltd. 
          Your goal is to help potential clients understand their technology needs. 
          Be professional, insightful, and offer advice on Cloud, Security, AI, and Software.
          If they describe a problem, suggest which of Sivenbrak's services (Cloud, Security, AI, DevOps, Strategy, Software) would fit.
          Keep responses concise and helpful.`,
          temperature: 0.7,
        },
      });
      return response.text || "I'm sorry, I couldn't generate a response at this time.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "There was an error connecting to our AI advisor. Please try again later.";
    }
  }

  async analyzeProject(projectDescription: string): Promise<string> {
    try {
      const ai = this.getAIClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analyze this IT project description and provide a high-level roadmap and key considerations: ${projectDescription}`,
        config: {
          thinkingConfig: { thinkingBudget: 24000 },
          systemInstruction: "You are a senior solution architect for Sivenbrak Technologies. Provide a deep technical analysis including architecture suggestions and potential risks.",
        },
      });
      return response.text || "Analysis unavailable.";
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return "Unable to perform deep analysis at this time.";
    }
  }
}

export const geminiConsultant = new GeminiConsultant();
