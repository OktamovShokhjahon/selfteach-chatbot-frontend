import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { QuestionForm } from "./components/MainContent/QuestionForm";
import { ResponseDisplay } from "./components/MainContent/ResponseDisplay";
import "./App.css";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/study", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponse(data);
      setHistory((prev) => [
        ...prev,
        {
          question: formData.question,
          answer: data.answer,
          subject: formData.subject,
          mainCommand: formData.mainCommand,
        },
      ]);
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
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="flex flex-col md:flex-row">
          <ThemeToggle />

          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-indigo-500 text-white"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>

          <Sidebar
            history={history}
            onHistoryClick={handleHistoryClick}
            sidebarOpen={sidebarOpen}
            onCloseSidebar={closeSidebar}
          />

          <div className="flex-1 p-4 md:p-8 md:ml-0">
            <div className="max-w-[1300px] mx-auto rounded-xl shadow-md p-4 md:p-8 bg-white dark:bg-gray-800">
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800 dark:text-white">
                SelfTeach
              </h1>

              <QuestionForm
                formData={formData}
                loading={loading}
                onSubmit={handleSubmit}
                onChange={handleChange}
              />

              <ResponseDisplay response={response} />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
