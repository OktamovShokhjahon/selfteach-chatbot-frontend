import { useTheme } from "../../context/ThemeContext";

export function HistoryItem({ item, onClick }) {
  const { darkMode } = useTheme();

  return (
    <div
      className="p-3 rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-50 dark:bg-gray-700 dark:hover:bg-gray-600"
      onClick={onClick}
    >
      <p className="font-medium truncate text-gray-800 dark:text-gray-200">
        {item.question}
      </p>
      <p className="text-sm mt-1 truncate text-gray-600 dark:text-gray-400">
        {item.answer}
      </p>
    </div>
  );
}
