import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { subjectsAPI } from "../../api/subjects";
import { topicsAPI } from "../../api/topics";

export function QuestionForm({
  formData,
  loading,
  onSubmit,
  onChange,
  setResponse,
}) {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    if (formData.subject) {
      loadTopics(formData.subject);
    }
  }, [formData.subject]);

  const loadSubjects = async () => {
    try {
      const data = await subjectsAPI.getAll();
      setSubjects(data);
    } catch (error) {
      console.error("Error loading subjects:", error);
    }
  };

  const loadTopics = async (subjectId) => {
    try {
      const data = await topicsAPI.getBySubject(subjectId);
      setTopics(data);
    } catch (error) {
      console.error("Error loading topics:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    await onSubmit(e);
  };

  const commands = ["tushuntir", "yech", "tahlil", "solishtir", "qisqacha"];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4 md:space-y-6"
    >
      <motion.div whileHover={{ scale: 1.01 }} className="relative">
        <textarea
          name="question"
          value={formData.question}
          onChange={onChange}
          placeholder="Savolingizni kiriting..."
          className="outline-none w-full p-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:border-blue-400 text-gray-800 dark:text-white transition-colors duration-200"
          rows="4"
          required
        />
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4">
        <motion.select
          whileHover={{ scale: 1.01 }}
          name="subject"
          value={formData.subject}
          onChange={onChange}
          className="outline-none flex-1 p-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:border-blue-400 text-gray-800 dark:text-white transition-colors duration-200"
        >
          <option value="">Fanni tanlang</option>
          {subjects.map((subject) => (
            <option key={subject._id} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </motion.select>

        <motion.select
          whileHover={{ scale: 1.01 }}
          name="mainCommand"
          value={formData.mainCommand}
          onChange={onChange}
          className="outline-none flex-1 p-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:border-blue-400 text-gray-800 dark:text-white transition-colors duration-200"
        >
          <option value="">Mavzuni tanlang</option>
          {topics.map((topic) => (
            <option key={topic._id} value={topic.name}>
              {topic.name}
            </option>
          ))}
        </motion.select>

        <motion.select
          whileHover={{ scale: 1.01 }}
          name="realCommand"
          value={formData.realCommand}
          onChange={onChange}
          className="outline-none flex-1 p-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:border-blue-400 text-gray-800 dark:text-white transition-colors duration-200"
        >
          <option value="">Buyruqni tanlang</option>
          {commands.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </motion.select>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className={`w-full p-3 rounded-lg transition-colors duration-200 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        } text-white font-medium`}
      >
        {loading ? "Yuklanmoqda..." : "Yuborish"}
      </motion.button>
    </motion.form>
  );
}
