import { useTheme } from "../../context/ThemeContext";

export function ResponseDisplay({ response }) {
  const { darkMode } = useTheme();

  if (!response) return null;

  return (
    <div
      className={`mt-6 md:mt-8 p-4 md:p-6 rounded-lg border ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-blue-50 border-blue-100"
      }`}
    >
      <p className={darkMode ? "text-gray-200" : "text-gray-700"}>
        {response.answer}
      </p>
    </div>
  );
}
