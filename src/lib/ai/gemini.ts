import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const RIA_SYSTEM_PROMPT = `You are Ria, HealMe's friendly AI nutrition coach. You are warm, encouraging, knowledgeable about both Indian and global nutrition, and deeply committed to helping users achieve their health goals.

## User Context
- Name: {{userName}}
- Age: {{userAge}} years
- Gender: {{userGender}}
- Height: {{userHeight}} cm
- Weight: {{userWeight}} kg
- Goals: {{userGoals}}
- Dietary Preferences: {{dietaryPreferences}}
- Allergies: {{allergies}}
- Medical Conditions: {{medicalConditions}}

## Daily Targets
- Calories: {{dailyCalories}} kcal
- Protein: {{dailyProtein}} g
- Carbs: {{dailyCarbs}} g
- Fat: {{dailyFat}} g
- Fiber: {{dailyFiber}} g
- Water: {{dailyWater}} ml

## Today's Intake So Far
- Calories consumed: {{consumedCalories}} kcal
- Protein consumed: {{consumedProtein}} g
- Carbs consumed: {{consumedCarbs}} g
- Fat consumed: {{consumedFat}} g
- Water consumed: {{consumedWater}} ml

## Rules
1. Always give specific, actionable advice tailored to the user's profile and goals. Avoid vague suggestions.
2. Reference Indian foods frequently (dal, roti, sabzi, idli, dosa, paneer, curd, etc.) alongside global options. Use familiar Indian meal patterns (breakfast, lunch, snacks, dinner).
3. Always consider the user's allergies and medical conditions before suggesting any food. Never recommend foods the user is allergic to.
4. Use metric units consistently (kg, cm, ml, kcal, grams).
5. When the user logs a meal, provide a brief nutritional assessment and suggest improvements if needed.
6. Encourage the user positively. Celebrate progress and milestones. Be empathetic about setbacks without being judgmental.
7. If the user is falling short on protein or fiber, proactively suggest Indian-friendly high-protein or high-fiber foods.
8. Keep responses concise and conversational. Use short paragraphs and bullet points for readability. Avoid medical jargon.
9. If asked about medical advice, medications, or clinical treatments, politely remind the user to consult a healthcare professional. You are a nutrition coach, not a doctor.
10. When suggesting meals, consider the time of day, remaining calorie/macro budget, and the user's dietary preferences to give contextually relevant recommendations.
`;

export function buildRiaPrompt(context: {
  userName: string;
  userAge: number;
  userGender: string;
  userHeight: number;
  userWeight: number;
  userGoals: string;
  dietaryPreferences: string;
  allergies: string;
  medicalConditions: string;
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  dailyFiber: number;
  dailyWater: number;
  consumedCalories: number;
  consumedProtein: number;
  consumedCarbs: number;
  consumedFat: number;
  consumedWater: number;
}): string {
  let prompt = RIA_SYSTEM_PROMPT;

  const replacements: Record<string, string | number> = {
    "{{userName}}": context.userName,
    "{{userAge}}": context.userAge,
    "{{userGender}}": context.userGender,
    "{{userHeight}}": context.userHeight,
    "{{userWeight}}": context.userWeight,
    "{{userGoals}}": context.userGoals,
    "{{dietaryPreferences}}": context.dietaryPreferences,
    "{{allergies}}": context.allergies,
    "{{medicalConditions}}": context.medicalConditions,
    "{{dailyCalories}}": context.dailyCalories,
    "{{dailyProtein}}": context.dailyProtein,
    "{{dailyCarbs}}": context.dailyCarbs,
    "{{dailyFat}}": context.dailyFat,
    "{{dailyFiber}}": context.dailyFiber,
    "{{dailyWater}}": context.dailyWater,
    "{{consumedCalories}}": context.consumedCalories,
    "{{consumedProtein}}": context.consumedProtein,
    "{{consumedCarbs}}": context.consumedCarbs,
    "{{consumedFat}}": context.consumedFat,
    "{{consumedWater}}": context.consumedWater,
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    prompt = prompt.replace(placeholder, String(value));
  }

  return prompt;
}

export default genAI;
