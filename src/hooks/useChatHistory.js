import { useState, useCallback } from "react";
import { chatHistoryAPI } from "../api/chatHistory";

export const useChatHistory = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all histories
  const fetchHistories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await chatHistoryAPI.getAll();
      setHistories(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new history
  const createHistory = useCallback(async (historyData) => {
    setLoading(true);
    try {
      const newHistory = await chatHistoryAPI.create(historyData);
      setHistories((prev) => [...prev, newHistory]);
      setError(null);
      return newHistory;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update history
  const updateHistory = useCallback(async (id, updates) => {
    setLoading(true);
    try {
      const updated = await chatHistoryAPI.update(id, updates);
      setHistories((prev) =>
        prev.map((history) => (history.id === id ? updated : history))
      );
      setError(null);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete history
  const deleteHistory = useCallback(async (id) => {
    setLoading(true);
    try {
      await chatHistoryAPI.delete(id);
      setHistories((prev) => prev.filter((history) => history.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    histories,
    loading,
    error,
    fetchHistories,
    createHistory,
    updateHistory,
    deleteHistory,
  };
};
