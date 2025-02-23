// Local Storage Keys
const CHAT_HISTORY_KEY = "chat_histories";

// Helper functions for localStorage
const getStoredHistories = () => {
  const stored = localStorage.getItem(CHAT_HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setStoredHistories = (histories) => {
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(histories));
};

export const chatHistoryAPI = {
  // Create new chat history
  create: async (data) => {
    const histories = getStoredHistories();
    const newHistory = {
      id: Date.now().toString(), // Simple ID generation
      ...data,
      createdAt: new Date().toISOString(),
    };
    histories.push(newHistory);
    setStoredHistories(histories);
    return newHistory;
  },

  // Get all chat histories
  getAll: async () => {
    return getStoredHistories();
  },

  // Get specific chat history
  getById: async (id) => {
    const histories = getStoredHistories();
    const history = histories.find((h) => h.id === id);
    if (!history) {
      throw new Error("Chat history not found");
    }
    return history;
  },

  // Update chat history
  update: async (id, data) => {
    const histories = getStoredHistories();
    const index = histories.findIndex((h) => h.id === id);
    if (index === -1) {
      throw new Error("Chat history not found");
    }
    const updatedHistory = {
      ...histories[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    histories[index] = updatedHistory;
    setStoredHistories(histories);
    return updatedHistory;
  },

  // Delete chat history
  delete: async (id) => {
    const histories = getStoredHistories();
    const filteredHistories = histories.filter((h) => h.id !== id);
    setStoredHistories(filteredHistories);
    return { success: true, message: "Chat history deleted" };
  },
};

// Error handler helper
const handleApiError = (error) => {
  if (error.message) {
    return new Error(error.message);
  }
  return new Error("An error occurred");
};
