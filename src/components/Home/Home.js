import { Tab, Tabs, Stack, Paper, Snackbar, Alert } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Outlet, useLocation } from "react-router";
import { QuestionList } from "../Questions/Questions";

const centerContentProps = {
  alignItems: 'center',
  justifyContent: 'space-between',
};

const getSplitQuestions = (loggedUser, questions) => {
  let unansweredQuestions = [];
  let answeredQuestions = [];
  Object.keys(questions).forEach(questionId => {
    Object.keys(loggedUser?.answers || {}).find(id => id === questionId)
      ? answeredQuestions.push(questions[questionId])
      : unansweredQuestions.push(questions[questionId]);
  });

  unansweredQuestions = unansweredQuestions.sort((a, b) => b.timestamp - a.timestamp);
  answeredQuestions = answeredQuestions.sort((a, b) => b.timestamp - a.timestamp);

  return {
    unansweredQuestions,
    answeredQuestions,
  };
}

function Home({ loggedUser, questions }) {
  const location = useLocation();
  const [cameFromNoPollFound, setCameFromNoPollFound] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showError, setShowError] = useState(false);
  const [reason, setReason] = useState({});

  const { unansweredQuestions, answeredQuestions } = getSplitQuestions(loggedUser, questions);
  const questionsToShow = activeTab === 0 ? unansweredQuestions : answeredQuestions;

  useEffect(() => {
    function setUp() {
      if (!!location.state?.reason) {
        setCameFromNoPollFound(true);
        setShowError(true);
        setReason(location.state.reason);
      }
    }
    setUp();
  }, [location, setShowError]);

  const handleOnChangeTab = (e, tab) => {
    setActiveTab(tab);
  };

  const hideError = () => {
    setShowError(false);
  };

  return (
    <Box>
      {cameFromNoPollFound &&
        <Snackbar
          open={showError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          autoHideDuration={5000}
          onClose={hideError}
        >
          <Alert severity="error" variant="filled">
            {reason.text}
          </Alert>
        </Snackbar>
      }
      <Stack {...centerContentProps}>
        <Tabs value={activeTab} onChange={handleOnChangeTab} sx={{ width: 600 }} className="children-centered-content">
          <Tab label="Unanswered Questions" sx={{ fontSize: 12 }} />
          <Tab label="Answered Questions" sx={{ fontSize: 12 }} />
        </Tabs>
        <Paper sx={{ width: 600 }} className="centered-content">
          <QuestionList {...loggedUser} questions={questionsToShow} activeTab={activeTab} />
        </Paper>
      </Stack>
      <Outlet />
    </Box>
  )
}

const mapStateToProps = ({ loggedUser, questions }) => ({
  loggedUser,
  questions,
});

export default connect(mapStateToProps)(Home);