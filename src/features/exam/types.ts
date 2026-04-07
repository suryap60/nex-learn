export interface QuestionOption {
  id: number;
  text: string;
}

export interface ExamQuestion {
  id: number;
  text: string;
  image?: string;
  options: QuestionOption[];
}

export interface ExamHistoryDetail {
  question_id: number;
  is_correct: boolean;
  selected_option_id: number | null;
}

export interface ExamResultPayload {
  success: boolean;
  exam_history_id: string;
  score: number;
  correct: number;
  wrong: number;
  not_attended: number;
  submitted_at: string;
  details: ExamHistoryDetail[];
}
