import { useTheme } from "../../context/ThemeContext";

export function ResponseDisplay({ response }) {
  const { darkMode } = useTheme();

  if (!response) return null;

  console.log(response);

  return (
    <div
      className={`mt-6 md:mt-8 p-4 md:p-6 rounded-lg border ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-blue-50 border-blue-100"
      }`}
    >
      <p className={darkMode ? "text-gray-200" : "text-gray-700"}>
        {response.answer.split("**").map((text, i) =>
          i % 2 === 0 ? (
            text.split("\n").map((line, j) => (
              <span key={`${i}-${j}`} className="">
                {line}
                <span className="font-bold">
                  {j < text.split("\n").length - 1 && <br />}
                </span>
              </span>
            ))
          ) : (
            <strong key={i} className="font-bold">
              {text}
            </strong>
          )
        )}
      </p>
    </div>
  );
}
