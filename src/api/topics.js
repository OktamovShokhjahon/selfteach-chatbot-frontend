const BASE_URL = "http://localhost:3000/api";

export const topicsAPI = {
  async getAll() {
    const response = await fetch(`${BASE_URL}/topics`);
    if (!response.ok) {
      throw new Error("Failed to fetch topics");
    }
    return response.json();
  },

  async getBySubject(subjectId) {
    const response = await fetch(`${BASE_URL}/topics/subject/${subjectId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch topics");
    }
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${BASE_URL}/topics/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch topic");
    }
    return response.json();
  },

  async create(topicData) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(topicData),
    });
    if (!response.ok) {
      throw new Error("Failed to create topic");
    }
    return response.json();
  },

  async update(id, topicData) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/topics/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(topicData),
    });
    if (!response.ok) {
      throw new Error("Failed to update topic");
    }
    return response.json();
  },

  async delete(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/topics/${id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": token,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete topic");
    }
    return response.json();
  },
};
