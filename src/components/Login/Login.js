import React, { useState } from "react";
import { connect } from "react-redux";
import Cookies from 'js-cookie';

import { Avatar, Button, Checkbox, FormControlLabel, FormGroup, ListItemAvatar, ListItemText, MenuItem, Select, Tooltip } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import './Login.css';
import { handleSetLoggedUser } from "../../actions/LoginOut";
import WorkingOnIt from "../ImLoading/ImLoading";

function getUsersOptions(users) {
  return Object.keys(users).map(id => users[id]);
}

function Login({ dispatch, users, loading }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleOnSelectedUser = (e) => {
    const id = e.target.value;
    setSelectedUser(id ? users[id] : '');
    setSelectedUserId(id);
  };

  const handleLogin = () => {
    dispatch(handleSetLoggedUser(selectedUser));
    if (keepLoggedIn) {
      Cookies.set('loggedUser', JSON.stringify(selectedUser));
    }
  };

  const handleOnChangeKeepLoggedIn = (e) => {
    setKeepLoggedIn(!keepLoggedIn);
  };

  if (loading) return <WorkingOnIt />;

  return (
    <div className="login-container">
      <h1>Welcome!</h1>
      <h2>Login to enjoy the game!</h2>
      <Select
        displayEmpty
        labelId="login-user-select-label"
        id="login-user-select"
        value={selectedUserId}
        defaultValue=""
        label="Select a user"
        variant="standard"
        sx={{ width: 300 }}
        onChange={handleOnSelectedUser}
      >
        <MenuItem value="">
          <em>Select a user</em>
        </MenuItem>
        {getUsersOptions(users).map(user => {
          return (
            <MenuItem key={user.id} value={user.id}>
              <ListItemAvatar>
                <Avatar src={user.avatarURL} />
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </MenuItem>
          )
        })}
      </Select>
      <FormGroup sx={{ width: 300, alignItems: 'center' }} row>
        <FormControlLabel
          control={<Checkbox value={keepLoggedIn} aria-label="Keep me logged in" />}
          onChange={handleOnChangeKeepLoggedIn}
          label="Keep me logged in"
        />
        <Tooltip placement="right" title="If checked, you won't need to login again after updating the page.">
          <InfoOutlinedIcon />
        </Tooltip>
      </FormGroup>
      <Button
        sx={{ width: 300, marginTop: '10px' }}
        variant="contained"
        endIcon={<LoginIcon />}
        onClick={handleLogin}
        disabled={!selectedUser}
      >
        Login
      </Button>
      <div id="login-bottom-space"></div>
    </div>
  )
}

const mapStateToProps = ({ users, loadingBar }) => ({
  users,
  loading: !!loadingBar.default,
});

export default connect(mapStateToProps)(Login);