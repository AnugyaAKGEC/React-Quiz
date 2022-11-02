export const questionService = {
  getAll,
};

export async function getAll() {
  const { REACT_APP_API_URL } = process.env;
  try {
    const response = await fetch(
      REACT_APP_API_URL ??
        "https://msquizbackend.azurewebsites.net/api/questions?_limit=-1"
    );
    return await response.json();
  } catch (error) {
    return [];
  }
}
