import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ChatHistoryList = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "chat_histories") {
        const updatedHistories = e.newValue ? JSON.parse(e.newValue) : [];
        setHistories(updatedHistories);
      }
    };

    const handleHistoryUpdate = () => {
      loadHistories();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("chatHistoryUpdated", handleHistoryUpdate);
    loadHistories();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("chatHistoryUpdated", handleHistoryUpdate);
    };
  }, []);

  const loadHistories = () => {
    try {
      const stored = localStorage.getItem("chat_histories");
      const histories = stored ? JSON.parse(stored) : [];
      // Sort histories by createdAt in descending order (newest first)
      const sortedHistories = histories.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setHistories(sortedHistories);
      setLoading(false);
    } catch (err) {
      setError("Chat tarixini yuklashda xatolik");
      setLoading(false);
    }
  };

  const deleteHistory = (id) => {
    try {
      const updatedHistories = histories.filter((h) => h.id !== id);
      localStorage.setItem("chat_histories", JSON.stringify(updatedHistories));
      setHistories(updatedHistories);
    } catch (err) {
      setError("Tarixni o'chirishda xatolik");
    }
  };

  const handleHistorySelect = (history) => {
    // Create a properly formatted history object
    const formattedHistory = {
      messages: [
        {
          content: history.messages[0]?.content || "",
          type: "question",
        },
        {
          content: history.messages[1]?.content || "",
          type: "answer",
        },
      ],
      subject: history.subject,
      mainCommand: history.mainCommand,
    };

    localStorage.setItem("selected_history", JSON.stringify(formattedHistory));

    window.dispatchEvent(
      new CustomEvent("historySelected", {
        detail: formattedHistory,
      })
    );
  };

  const handleNewChat = () => {
    // Clear selected history and form data
    localStorage.removeItem("selected_history");
    window.dispatchEvent(
      new CustomEvent("historySelected", {
        detail: {
          messages: [{ content: "", type: "question" }],
          subject: "",
          mainCommand: "",
        },
      })
    );
    // Dispatch new event to clear response
    window.dispatchEvent(new Event("clearResponse"));
  };

  const clearAllHistory = () => {
    try {
      localStorage.setItem("chat_histories", JSON.stringify([]));
      setHistories([]);
      window.dispatchEvent(new Event("chatHistoryUpdated"));
    } catch (err) {
      setError("Tarixni tozalashda xatolik");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center py-8"
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </motion.div>
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

  console.log(histories);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <div className="flex gap-4">
        <button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewChat}
          className="flex-1 p-4 bg-blue-500 hover:bg-blue-600 dark:bg-indigo-500 dark:hover:bg-indigo-600 
                    text-white rounded-lg shadow-md transition-colors duration-200 
                    flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Yangi chat
        </button>

        <button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={clearAllHistory}
          className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md 
                    transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        </button>
      </div>

      {histories.map((history) => (
        <div
          key={history.id}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg 
                    transition-shadow duration-200 border border-gray-100 dark:border-gray-700"
          onClick={() => handleHistorySelect(history)}
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
            onClick={(e) => {
              e.stopPropagation();
              deleteHistory(history.id);
            }}
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
        </div>
      ))}
    </motion.div>
  );
};

export default ChatHistoryList;
