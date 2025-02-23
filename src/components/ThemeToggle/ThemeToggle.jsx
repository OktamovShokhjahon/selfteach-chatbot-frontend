import { useTheme } from "../../context/ThemeContext";

export function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      className={`fixed top-4 right-4 z-50 p-2 rounded-lg ${
        darkMode ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-yellow-400"
      }`}
      onClick={toggleDarkMode}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
