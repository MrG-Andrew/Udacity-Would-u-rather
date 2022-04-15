import { getQuestions } from "../utilities/api";

export const SET_QUESTIONS = 'SET_QUESTIONS';

export function handleFetchQuestions() {
  return async dispatch => {
    return getQuestions().then(questions => {
      dispatch(setQuestionsAction(questions));
    });
  };
};

export function setQuestionsAction(questions) {
  return {
    type: SET_QUESTIONS,
    questions
  };
}