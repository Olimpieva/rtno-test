const getUserById = async (id: string) => {
  try {
    const response = await fetch("/api/user", {
      body: JSON.stringify({ id }),
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Oops! Something went wrong!", error);
  }
};

export default getUserById;
