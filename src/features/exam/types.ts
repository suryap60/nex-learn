export interface QuestionOption {
  id: string | number;
  text: string;
}

export interface ExamQuestion {
  id: string | number;
  text: string;
  image?: string;
  options: QuestionOption[];
}

export interface ExamHistoryDetail {
  question_id: string | number;
  is_correct: boolean;
  selected_option_id: string | number | null;
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
