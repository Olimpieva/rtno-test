import { ChatItem } from "types";

const getAllChats = async () => {
  try {
    const response = await fetch("/api/chat");
    const data = await response.json();
    const transformedData: ChatItem[] = data.map((item: any) => ({
      ...item,
      chat: JSON.parse(item.chat),
    }));

    return transformedData;
  } catch (error) {
    console.error("Oops! Something went wrong!", error);
    throw error;
  }
};

export default getAllChats;
