import axios from "axios";
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch Feedback Data
  const fetchFeedback = async () => {
    const response = await axios.get("/feedback?_sort=id&_order=desc");
    const data = response.data;

    setFeedback(data);
    setIsLoading(false);
  };

  // Add Feedback
  const addFeedback = async (newFeedback) => {
    const response = await axios.post("/feedback", newFeedback);
    const data = response.data;

    setFeedback([data, ...feedback]);
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };

  // Update Feedback
  const updateFeedback = async (id, updItem) => {
    const response = await axios.put(`/feedback/${id}`, updItem);
    const data = response.data;

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  // Delete Feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await axios.delete(`/feedback/${id}`);

      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        editFeedback,
        updateFeedback,
        deleteFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
