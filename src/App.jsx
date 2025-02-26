import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { QuestionForm } from "./components/MainContent/QuestionForm";
import { ResponseDisplay } from "./components/MainContent/ResponseDisplay";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Layout from "./components/Layout/Layout";
import { useChatHistory } from "./hooks/useChatHistory";

function App() {
  const [formData, setFormData] = useState({
    subject: "",
    question: "",
    mainCommand: "",
  });
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { createHistory } = useChatHistory();

  useEffect(() => {
    const handleHistorySelected = (event) => {
      const history = event.detail;
      // Update form data
      setFormData({
        question: history.messages[0]?.content || "",
        subject: history.subject,
        mainCommand: history.mainCommand,
      });

      // Update response if it exists in history
      if (history.messages && history.messages.length > 1) {
        setResponse({
          answer: history.messages[1]?.content || "",
        });
      }
    };

    const handleClearResponse = () => {
      setResponse(null);
      setFormData({
        subject: "",
        question: "",
        mainCommand: "",
      });
    };

    window.addEventListener("historySelected", handleHistorySelected);
    window.addEventListener("clearResponse", handleClearResponse);

    // Check for selected history in localStorage when component mounts
    const selectedHistory = localStorage.getItem("selected_history");
    if (selectedHistory) {
      const history = JSON.parse(selectedHistory);
      handleHistorySelected({ detail: history });
      localStorage.removeItem("selected_history"); // Clean up
    }

    return () => {
      window.removeEventListener("historySelected", handleHistorySelected);
      window.removeEventListener("clearResponse", handleClearResponse);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/study", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponse(data);

      // Create history entry
      const historyEntry = {
        title: formData.question.slice(0, 50) + "...",
        messages: [
          {
            type: "question",
            content: formData.question,
            timestamp: new Date().toISOString(),
          },
          {
            type: "answer",
            content: data.answer,
            timestamp: new Date().toISOString(),
          },
        ],
        subject: formData.subject,
        mainCommand: formData.mainCommand,
      };

      // Use createHistory from useChatHistory hook
      await createHistory(historyEntry);

      // Clear form data after successful submission
      setFormData({
        subject: "",
        question: "",
        mainCommand: "",
      });
    } catch (error) {
      console.error("Xato:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updates = { [name]: value };

      if (name === "question") {
        updates.subject = "";
        updates.mainCommand = "";
      }

      return {
        ...prev,
        ...updates,
      };
    });
  };

  const handleHistoryClick = (item) => {
    setFormData({
      question: item.question,
      subject: item.subject,
      mainCommand: item.mainCommand,
    });
    setResponse({ answer: item.answer });
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <Layout
                history={history}
                onHistoryClick={handleHistoryClick}
                sidebarOpen={sidebarOpen}
                onCloseSidebar={closeSidebar}
                setSidebarOpen={setSidebarOpen}
              >
                <div className="max-w-[1300px] mx-auto rounded-xl shadow-md p-4 md:p-8 bg-white dark:bg-gray-800">
                  <QuestionForm
                    formData={formData}
                    loading={loading}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    setResponse={setResponse}
                  />
                  <ResponseDisplay response={response} />
                </div>
              </Layout>
            }
          />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
