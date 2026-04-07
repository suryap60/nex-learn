import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnswerPayload {
  question_id: number;
  selected_option_id: number | null;
}

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

interface ExamState {
  questions: ExamQuestion[];
  config: {
    questions_count: number;
    total_marks: number;
    total_time: number;
    time_for_each_question: number;
    mark_per_each_answer: number;
    instruction: string;
  } | null;
  answers: AnswerPayload[];
  result: any | null;
  markedForReview: number[]; // Store question IDs
}

const initialState: ExamState = {
  questions: [],
  config: null,
  answers: [],
  result: null,
  markedForReview: [],
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setExamData(state, action: PayloadAction<any>) {
      state.questions = action.payload.questions || [];
      state.config = {
        questions_count: action.payload.questions_count || 0,
        total_marks: action.payload.total_marks || 0,
        total_time: action.payload.total_time || 0,
        time_for_each_question: action.payload.time_for_each_question || 0,
        mark_per_each_answer: action.payload.mark_per_each_answer || 0,
        instruction: action.payload.instruction || "",
      };
      
      // Initialize fresh answers if needed
      state.answers = (action.payload.questions || []).map((q: any) => ({
        question_id: q.id,
        selected_option_id: null,
      }));
      state.markedForReview = [];
      state.result = null;
    },
    setAnswer(state, action: PayloadAction<{ question_id: number; selected_option_id: number | null }>) {
      const idx = state.answers.findIndex(a => a.question_id === action.payload.question_id);
      if (idx !== -1) {
        state.answers[idx].selected_option_id = action.payload.selected_option_id;
      }
    },
    toggleMarkForReview(state, action: PayloadAction<number>) {
      const qId = action.payload;
      if (state.markedForReview.includes(qId)) {
        state.markedForReview = state.markedForReview.filter(id => id !== qId);
      } else {
        state.markedForReview.push(qId);
      }
    },
    setResultData(state, action: PayloadAction<any>) {
      state.result = action.payload;
    },
    clearExamContext(state) {
      state.answers = [];
      state.result = null;
      state.markedForReview = [];
    }
  },
});

export const { setExamData, setAnswer, toggleMarkForReview, setResultData, clearExamContext } = examSlice.actions;
export default examSlice.reducer;
