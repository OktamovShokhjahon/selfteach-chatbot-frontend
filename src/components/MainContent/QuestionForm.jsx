import { useTheme } from "../../context/ThemeContext";
import { useEffect } from "react";

export function QuestionForm({
  formData,
  loading,
  onSubmit,
  onChange,
  setResponse,
}) {
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleHistorySelected = (event) => {
      const history = event.detail;
      // Update form data
      onChange({
        target: { name: "question", value: history.messages[0]?.content || "" },
      });
      onChange({ target: { name: "subject", value: history.subject } });
      onChange({ target: { name: "mainCommand", value: history.mainCommand } });

      // Update response
      if (history.messages && history.messages.length > 1) {
        setResponse({
          answer: history.messages[1]?.content || "",
        });
      }
    };

    // Check for selected history in localStorage when component mounts
    const selectedHistory = localStorage.getItem("selected_history");
    if (selectedHistory) {
      const history = JSON.parse(selectedHistory);
      onChange({
        target: { name: "question", value: history.messages[0]?.content || "" },
      });
      onChange({ target: { name: "subject", value: history.subject } });
      onChange({ target: { name: "mainCommand", value: history.mainCommand } });

      // Update response if it exists in history
      if (history.messages && history.messages.length > 1) {
        setResponse({
          answer: history.messages[1]?.content || "",
        });
      }
      localStorage.removeItem("selected_history"); // Clean up
    }

    window.addEventListener("historySelected", handleHistorySelected);
    return () => {
      window.removeEventListener("historySelected", handleHistorySelected);
    };
  }, [onChange, setResponse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <textarea
          name="question"
          value={formData.question}
          onChange={onChange}
          placeholder="Savolingizni kiriting..."
          className="outline-none w-full p-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:border-blue-400 text-gray-800 dark:text-white transition-colors duration-200"
          rows="4"
          required
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <select
          name="subject"
          value={formData.subject}
          onChange={onChange}
          className="outline-none flex-1 p-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:border-blue-400 text-gray-800 dark:text-white transition-colors duration-200"
        >
          <option
            value=""
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Fan nomini tanlang
          </option>
          <option
            value="matematika"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Matematika
          </option>
          <option
            value="fizika"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Fizika
          </option>
          <option
            value="kimyo"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Kimyo
          </option>
          <option
            value="biologiya"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Biologiya
          </option>
          <option
            value="informatika"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Informatika
          </option>
          <option
            value="ingliz_tili"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Ingliz tili
          </option>
          <option
            value="rus_tili"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Rus tili
          </option>
          <option
            value="ona_tili"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Ona tili
          </option>
          <option
            value="adabiyot"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Adabiyot
          </option>
          <option
            value="tarix"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Tarix
          </option>
          <option
            value="geografiya"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Geografiya
          </option>
          <option
            value="astronomiya"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Astronomiya
          </option>
        </select>

        <select
          name="mainCommand"
          value={formData.mainCommand}
          onChange={onChange}
          className="outline-none flex-1 p-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:border-blue-400 text-gray-800 dark:text-white transition-colors duration-200"
        >
          <option
            value=""
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Asosiy buyruqni tanlang
          </option>
          <option
            value="explain"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Tushuntirish
          </option>
          <option
            value="solve"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Yechish
          </option>
          <option
            value="analyze"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Tahlil qilish
          </option>
          <option
            value="compare"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Taqqoslash
          </option>
          <option
            value="summarize"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Xulosa qilish
          </option>
          <option
            value="other"
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            Boshqa
          </option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-3 rounded-lg transition-colors duration-200 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        } text-white font-medium`}
      >
        {loading ? "Yuklanmoqda..." : "Yuborish"}
      </button>
    </form>
  );
}
