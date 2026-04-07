// features/exam/api.ts
import api from "@/src/services/axios";

export const getQuestions = () => {
  return api.get("/question/list");
};

export const submitAnswers = (answers: any) => {
  const formData = new FormData();
  formData.append("answers", JSON.stringify(answers));

  return api.post("/answers/submit", formData);
};