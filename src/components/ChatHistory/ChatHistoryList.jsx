import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { chatHistoryAPI } from "../../api/chatHistory";
import { useChatHistory } from "../../hooks/useChatHistory";

const ChatHistoryList = () => {
  const { user } = useAuth();
  const { histories, loading, error, fetchHistories } = useChatHistory();
  const [historiesState, setHistoriesState] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  console.log(histories);

  useEffect(() => {
    if (user) {
      console.log("Current user:", user); // Debug log
      fetchHistories();
    }
  }, [user, fetchHistories]);

  useEffect(() => {
    setHistoriesState(histories);
  }, [histories]);

  // Add listener for history updates
  useEffect(() => {
    const handleHistoryUpdate = () => {
      fetchHistories();
    };

    window.addEventListener("chatHistoryUpdated", handleHistoryUpdate);

    return () => {
      window.removeEventListener("chatHistoryUpdated", handleHistoryUpdate);
    };
  }, [fetchHistories]);

  const deleteHistory = async (id) => {
    try {
      await chatHistoryAPI.delete(id);
      // Update local state immediately for better UX
      setHistoriesState((prevHistories) =>
        prevHistories.filter((history) => history._id !== id)
      );
      // Optionally show success message
      console.log("History deleted successfully");
    } catch (error) {
      console.error("Failed to delete history:", error);
      // Optionally show error message to user
    }
  };

  const deleteAllHistory = async () => {
    if (!window.confirm("Haqiqatan ham barcha tarixni o'chirmoqchimisiz?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await chatHistoryAPI.deleteAll();
      setHistoriesState([]);
      console.log("All history deleted successfully");
    } catch (error) {
      console.error("Failed to delete all history:", error);
    } finally {
      setIsDeleting(false);
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
    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent("historySelected", { detail: formattedHistory })
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
      setHistoriesState([]);
      window.dispatchEvent(new Event("chatHistoryUpdated"));
    } catch (err) {
      console.error("Failed to clear all history:", err);
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

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Please{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            login
          </Link>{" "}
          to view your chat history
        </p>
      </div>
    );
  }

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
          onClick={deleteAllHistory}
          disabled={isDeleting}
          className={`p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md 
                    transition-colors duration-200 flex items-center justify-center gap-2
                    ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
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
          {isDeleting ? "O'chirilmoqda..." : "o'chrish"}
        </button>
      </div>

      {historiesState.map((history) => (
        <motion.div
          key={history._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
          onClick={() => handleHistorySelect(history)}
        >
          <h3 className="font-medium text-gray-800 dark:text-white mb-2 truncate">
            {history.messages[0]?.content || "No question"}
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
              deleteHistory(history._id);
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
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ChatHistoryList;
