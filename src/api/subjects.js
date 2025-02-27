const BASE_URL = "http://localhost:3000/api";

export const subjectsAPI = {
  async getAll() {
    const response = await fetch(`${BASE_URL}/subjects`);
    if (!response.ok) {
      throw new Error("Failed to fetch subjects");
    }
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${BASE_URL}/subjects/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch subject");
    }
    return response.json();
  },

  async create(subjectData) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(subjectData),
    });
    if (!response.ok) {
      throw new Error("Failed to create subject");
    }
    return response.json();
  },

  async update(id, subjectData) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/subjects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(subjectData),
    });
    if (!response.ok) {
      throw new Error("Failed to update subject");
    }
    return response.json();
  },

  async delete(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/subjects/${id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": token,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete subject");
    }
    return response.json();
  },
};
