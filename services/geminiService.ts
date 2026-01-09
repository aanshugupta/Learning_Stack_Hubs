
import { GoogleGenAI, Type } from "@google/genai";
import { RoadmapMilestone, NewsItem } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Generate a learning roadmap using Gemini 3
export const generateRoadmap = async (goal: string): Promise<RoadmapMilestone[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a detailed, week-by-week learning roadmap for a beginner wanting to learn "${goal}". 
      The roadmap should span 8 weeks. For each week, provide a clear title, a concise description of the topics to cover, and a list of 2-3 specific, actionable resources or project ideas. 
      Ensure the output is a clean JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              week: {
                type: Type.INTEGER,
                description: 'The week number of the milestone.'
              },
              title: {
                type: Type.STRING,
                description: 'A short, descriptive title for the week\'s focus.'
              },
              description: {
                type: Type.STRING,
                description: 'A brief summary of the topics and goals for the week.'
              },
              resources: {
                type: Type.ARRAY,
                description: 'A list of suggested resources, tutorials, or small projects.',
                items: {
                  type: Type.STRING
                }
              }
            },
            propertyOrdering: ["week", "title", "description", "resources"],
          }
        },
      },
    });

    // Safely access response.text property (not a method)
    const jsonText = (response.text || "").trim();
    if (!jsonText) throw new Error("AI returned empty content");
    
    const roadmapData = JSON.parse(jsonText);
    
    if (!Array.isArray(roadmapData)) {
      throw new Error("AI response is not in the expected array format.");
    }
    
    return roadmapData as RoadmapMilestone[];

  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw new Error("Failed to generate learning roadmap.");
  }
};

// Fetch tech news using Google Search grounding
export const fetchDailyNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for today's top 5 trending tech and AI news stories. Provide a JSON array of objects with 'title', 'summary' (max 2 sentences), 'category' (e.g., AI, Robotics, Software), and 'sourceName'.",
      config: {
        tools: [{ googleSearch: {} }],
        // Grounding with responseMimeType: "application/json" is used here for structured data,
        // though caution is needed as citations can sometimes interfere with JSON structure.
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              category: { type: Type.STRING },
              sourceName: { type: Type.STRING },
            },
            required: ["title", "summary", "category", "sourceName"]
          }
        }
      },
    });

    // Extract grounding chunks for website links
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const text = (response.text || "").trim();
    if (!text) return [];

    const rawItems = JSON.parse(text);

    // Map citations from groundingMetadata to provide source URLs
    return rawItems.map((item: any, index: number) => ({
      ...item,
      sourceUrl: chunks[index]?.web?.uri || chunks[0]?.web?.uri || "https://news.google.com"
    })) as NewsItem[];

  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
