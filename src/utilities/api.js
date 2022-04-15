import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from "./_DATA";

export function getInitialData() {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }));
}

export function getUsers() {
  return _getUsers();
}

export function getQuestions() {
  return _getQuestions();
}

export function saveQuestionAnswer(loggedUser, question, answer) {
  return _saveQuestionAnswer({
    authedUser: loggedUser.id,
    qid: question.id,
    answer
  });
}

export function saveQuestion(optionOneText, optionTwoText, author) {
  return _saveQuestion({ optionOneText, optionTwoText, author });
}