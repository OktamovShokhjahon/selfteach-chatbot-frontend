import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://localhost:3000/api";

export const chatHistoryAPI = {
  async getAll() {
    const token = localStorage.getItem("token");
    // const user = await axios.post(
    //   `${BASE_URL}/token/decode`,
    //   {
    //     token,
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // console.log("user", user);
    const response = await fetch(`${BASE_URL}/chat-history`, {
      // method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData); // Debug log
      throw new Error(errorData.message || "Failed to fetch history");
    }
    return response.json();
  },

  async create(historyData) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/study`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(historyData),
    });
    if (!response.ok) {
      throw new Error("Failed to create history");
    }
    return response.json();
  },

  async delete(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/chat-history/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete history");
    }
    return response.json();
  },

  async deleteAll() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/chat-history/clear-all`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete all histories");
    }
    return response.json();
  },
};
