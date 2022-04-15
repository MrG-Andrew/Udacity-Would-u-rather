import { Avatar, Button, Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Questions.css';

function NoQuestions() {
  return (
    <div className="centered-content">
      <p>No questions to show!</p>
    </div>
  );
}

const QuestionList = ({ questions }) => {
  if (!questions.length) return <NoQuestions />;

  return (
    <Stack className="questions" direction="column" spacing={2}>
      {questions.map(question => (
        <Question key={question.id} question={question} />
      ))}
    </Stack>
  );
}

const mapStateToProps = ({ users }, { question }) => ({
  users,
  question,
});

const Question = connect(mapStateToProps)(({ users, question }) => {
  const ellipsedOptionOne = `...${question.optionOne.text.match(/\w+\S/g).slice(0, 2).join(' ')}...`;
  const author = users[question.author];
  const navigate = useNavigate();

  function handleOnClickViewPoll() {
    navigate(`/poll/${question.id}`);
  }

  return (
    <Stack direction="column" border="#555 1px solid">
      <Stack className="question-block" borderBottom="black 1px solid">
        <h3 className="question-title">{`${author.name} asked:`}</h3>
      </Stack>
      <Stack direction="row" className="question-block">
        <Stack width={200}>
          <Avatar src={author.avatarURL} sx={{ height: 128, width: 128 }} />
        </Stack>
        <Stack width="100%" direction="column" justifyContent="center" alignItems="center">
          <b>Would you rather...</b>
          <p>{ellipsedOptionOne}</p>
          <Button onClick={handleOnClickViewPoll}>
            View poll
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
});

export { QuestionList, Question };