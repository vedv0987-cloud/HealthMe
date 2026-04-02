export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
};

export type AiCoachResponse = {
  reply: string;
  suggestions: string[];
};
