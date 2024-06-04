type ChatMessage = {
  id: number;
  message: string;
  type: "bot" | "manager" | "client";
};

export type ChatItem = {
  _id: string;
  chat: ChatMessage[];
  company: string;
  first: number;
  last: number;
  manager: string;
};
