const getAllChats = async () => {
  try {
    const response = await fetch("/api/chat");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Oops! Something went wrong!", error);
  }
};

export default getAllChats;
