import { Avatar, Paper, Stack } from "@mui/material";
import { connect } from "react-redux";

import './Leaderboard.css';

function getQuestionsAnsweredCount(user) {
  return Object.keys(user.answers).length;
}

function getCreatedQuestionsCount(user) {
  return user.questions.length;
}

function getScore(user) {
  return getQuestionsAnsweredCount(user) + getCreatedQuestionsCount(user);
}

function Leaderboard({ users }) {
  const usersArr = Object.keys(users).map(userId => users[userId]).sort((a, b) => getScore(b) - getScore(a));

  return (
    <div className="leaderboard-container centered-content">
      <Stack
        className="centered-content"
        direction="column"
        spacing={4}
        sx={{ marginBottom: '20px' }}
      >
        {usersArr.map((user, index) => (
          <Paper key={user.id} elevation={3} className="leaderboard-card">
            <div className={`place-${index + 1}`}></div>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" className="centered-content leaderboard-section">
                <Avatar src={user.avatarURL} sx={{ height: 128, width: 128 }} />
              </Stack>
              <Stack direction="column" className="centered-content leaderboard-section leaderboard-middle-section" justifyContent="space-between" sx={{ width: '100%' }}>
                <h2>{user.name}</h2>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                  <b>Answered questions</b>
                  <b>{getQuestionsAnsweredCount(user)}</b>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                  <b>Created questions</b>
                  <b>{getCreatedQuestionsCount(user)}</b>
                </Stack>
              </Stack>
              <Stack direction="column" className="centered-content leaderboard-section">
                <h3>Score</h3>
                <div className="leaderboard-score">{getScore(user)}</div>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </div>
  )
}

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Leaderboard);