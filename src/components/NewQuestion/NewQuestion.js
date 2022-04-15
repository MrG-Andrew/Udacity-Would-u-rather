import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading";
import { useNavigate } from "react-router";
import handleInitialData from "../../actions/shared";
import { saveQuestion } from "../../utilities/api";

import './NewQuestion.css';

function NewQuestion({ dispatch, loggedUser, loading }) {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  function openError(text) {
    setErrorText(text);
    setShowError(true);
  }

  function hideError() {
    setErrorText('');
    setShowError(false);
  }

  async function handleOnSubmit() {
    if (!optionOneText.trim() || !optionTwoText.trim()) {
      return openError('Please, fill all the fields!');
    }
    hideError();
    dispatch(showLoading());
    try {
      await saveQuestion(optionOneText.trim(), optionTwoText.trim(), loggedUser.id);
    } catch (err) {
      openError('Something went wrong. Please try again!');
    }
    dispatch(handleInitialData());
    dispatch(hideLoading());
    navigate('/');
  }

  return (
    <div className="new-question-container centered-content">
      <Snackbar
        open={showError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={hideError}
      >
        <Alert severity="error" variant="filled">
          {errorText}
        </Alert>
      </Snackbar>
      <h2>Create New Question</h2>
      <form>
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
          <h3>Would you rather...</h3>
          <TextField
            className="new-question-field"
            placeholder="finish writing this question"
            variant="outlined"
            label={'Type something'}
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
          />
          <b>or</b>
          <TextField
            className="new-question-field"
            placeholder="admit you're not so creative"
            variant="outlined"
            label="Type something"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            disabled={loading}
            onClick={handleOnSubmit}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  )
}

const mapStateToProps = ({ loggedUser, loadingBar }) => ({
  loggedUser,
  loading: !!loadingBar.default,
});

export default connect(mapStateToProps)(NewQuestion);