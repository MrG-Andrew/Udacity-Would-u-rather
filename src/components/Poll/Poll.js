import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { connect } from "react-redux";
import { Avatar, Button, Grow, Modal, Paper, Stack } from "@mui/material";

import './Poll.css';
import ProgressBar from "../ProgressBar/ProgressBar";
import { saveQuestionAnswer } from "../../utilities/api";
import { hideLoading, showLoading } from "react-redux-loading";
import handleInitialData from "../../actions/shared";
import { POLL_NOT_FOUND } from "../../utilities/NotFound";

const mapStateToPollCardProps = ({ loggedUser, loadingBar }, props) => ({
  loggedUser,
  loading: !!loadingBar.default,
  ...props,
});

const PollCard = connect(mapStateToPollCardProps)(({ question, option, isAnswered, loggedUser, onVote, loading }) => {
  const votes = {
    optionOne: question.optionOne.votes,
    optionTwo: question.optionTwo.votes,
    total: question.optionOne.votes.length + question.optionTwo.votes.length,
  };
  let optionVoted;
  if (isAnswered) {
    optionVoted = votes.optionOne.find(id => id === loggedUser.id) ? 'optionOne' : 'optionTwo';
  }

  function getVotesPercentage(_votes) {
    return (_votes * 100) / (votes.optionOne.length + votes.optionTwo.length);
  }

  return (
    <Stack className={`poll-option centered-content ${isAnswered && 'answered'} ${optionVoted === option && 'user-vote'}`}>
      {optionVoted === option &&
        <div className="poll-vote-badge">Your Vote</div>
      }
      <h3 className="poll-option-text">{question[option].text}</h3>
      {!isAnswered &&
        <Button fullWidth variant="outlined" onClick={onVote} disabled={!!loading}>Vote</Button>
      }
      {isAnswered &&
        <React.Fragment>
          <ProgressBar value={getVotesPercentage(votes[option].length)} />
          <h5 className="poll-option-votes">{votes[option].length} out of {votes.total} votes</h5>
        </React.Fragment>
      }
    </Stack>
  );
});

const Poll = ({ dispatch, loggedUser, users, questions, loading }) => {
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const question = questions[id];
  const author = users[question?.author];
  const isAnswered = Object.keys(users[loggedUser.id].answers).some(answerId => answerId === id);

  useEffect(() => {
    function setUp() {
      if (!question) {
        navigate('/', { state: { reason: POLL_NOT_FOUND } });
      } else {
        setShow(true); // To solve the render problem from mui animation library
      }
    }
    setUp();
  }, [question, navigate]);

  if (!question) return <div></div>;

  function handleClosePoll(a, b) {
    if (!loading) {
      navigate('/');
    }
  }

  async function handleOnVote(option) {
    dispatch(showLoading());
    await saveQuestionAnswer(loggedUser, question, option);
    dispatch(handleInitialData());
    dispatch(hideLoading());
  }

  return (
    <Grow in={show}>
      <Modal
        open={true}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        onClose={handleClosePoll}
        className="centered-content"
        sx={{ width: '100%', height: '100%' }}
      >
        <Stack className="poll centered-content">
          <Paper className="poll-card">
            <Stack direction="column">
              <Stack className="poll-block" borderBottom="black 1px solid">
                <h3 className="poll-title">{`Asked by ${author.name}`}</h3>
              </Stack>
              <Stack direction="row" justifyContent="space-between" className="poll-block" spacing={0}>
                <Stack width={200} justifyContent="center" alignItems="center">
                  <Avatar src={author.avatarURL} sx={{ height: 128, width: 128 }} />
                </Stack>
                <Stack width="100%" direction="column" justifyContent="center" alignItems="center" spacing={2} className="poll-options-container">
                  <h3>Would you rather...</h3>
                  <PollCard question={question} option="optionOne" isAnswered={isAnswered} onVote={() => handleOnVote('optionOne')} />
                  <PollCard question={question} option="optionTwo" isAnswered={isAnswered} onVote={() => handleOnVote('optionTwo')} />
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Modal>
    </Grow>
  );
};

const mapStateToProps = ({ loggedUser, users, questions, loadingBar }) => ({
  loggedUser,
  users,
  questions,
  loading: !!loadingBar.default,
});

export default connect(mapStateToProps)(Poll);