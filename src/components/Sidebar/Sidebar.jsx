import { useTheme } from "../../context/ThemeContext";
import ChatHistoryList from "../ChatHistory/ChatHistoryList";
import { HistoryItem } from "./HistoryItem";

export function Sidebar({
  history,
  onHistoryClick,
  sidebarOpen,
  onCloseSidebar,
}) {
  const { darkMode } = useTheme();

  return (
    <>
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0  bg-opacity-50 z-30"
          onClick={onCloseSidebar}
        ></div>
      )}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-full md:w-80 bg-white dark:bg-gray-800 h-[calc(100vh-64px)] overflow-y-auto fixed md:sticky left-0 top-16 p-4 border-r border-gray-100 dark:border-gray-700 transition-transform duration-300 z-40 shadow-sm`}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Tarix
        </h2>
        <div className="space-y-4">
          <ChatHistoryList />
          {/* {history.map((item, index) => (
            <HistoryItem
              key={index}
              item={item}
              onClick={() => onHistoryClick(item)}
            />
          ))} */}
        </div>
      </div>
    </>
  );
}
