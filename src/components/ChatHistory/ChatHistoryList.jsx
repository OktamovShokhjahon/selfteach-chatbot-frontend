import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ChatHistoryList = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("chat_histories");
      const histories = stored ? JSON.parse(stored) : [];
      setHistories(histories);
      setLoading(false);
    } catch (err) {
      setError("Chat tarixini yuklashda xatolik");
      setLoading(false);
    }
  }, []);

  const deleteHistory = (id) => {
    try {
      const updatedHistories = histories.filter((h) => h.id !== id);
      localStorage.setItem("chat_histories", JSON.stringify(updatedHistories));
      setHistories(updatedHistories);
    } catch (err) {
      setError("Tarixni o'chirishda xatolik");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8 bg-red-50 dark:bg-red-900/10 rounded-lg">
        {error}
      </div>
    );
  }

  if (!histories?.length) {
    return (
      <div className="text-gray-500 dark:text-gray-400 text-center py-8 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
        Chat tarixi topilmadi
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {histories &&
        histories.map((history) => (
          <motion.div
            key={history.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {history.title}
            </h3>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Mavzu:</span>
                <span className="capitalize">{history.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Buyruq:</span>
                <span>{history.mainCommand}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Sana:</span>
                <span>{new Date(history.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Xabarlar:</span>
                <span>{history.messages?.length || 0}</span>
              </div>
            </div>
            <button
              onClick={() => deleteHistory(history.id)}
              className="mt-4 px-4 py-2 w-full text-sm text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              O'chirish
            </button>
          </motion.div>
        ))}
    </div>
  );
};

export default ChatHistoryList;
