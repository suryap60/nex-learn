import api from "@/src/services/axios";

export const getQuestions = () => {
  return api.get("/question/list");
};

export const submitAnswers = (answers: any[]) => {
  const formData = new FormData();
  // Ensure IDs are numbers as the server expects integers
  const formattedAnswers = answers.map(a => {
    const qId = typeof a.question_id === "string" ? parseInt(a.question_id, 10) : a.question_id;
    const oId = typeof a.selected_option_id === "string" ? parseInt(a.selected_option_id, 10) : a.selected_option_id;

    return {
      question_id: isNaN(qId) ? a.question_id : qId,
      selected_option_id: isNaN(oId) ? a.selected_option_id : oId
    };
  });

  formData.append("answers", JSON.stringify(formattedAnswers));

  return api.post("/answers/submit", formData);
};