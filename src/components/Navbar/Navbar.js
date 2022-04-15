import { AppBar, Avatar, Stack, Tabs, Toolbar, Tab, Link } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { handleRemoveLoggedUser } from "../../actions/LoginOut";

import './Navbar.css';

const centerContentProps = {
  alignItems: 'center',
  justifyContent: 'space-between',
};

function Nav({ dispatch, loggedUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = {
    0: { label: 'Home', href: '/' },
    1: { label: 'New Question', href: '/add' },
    2: { label: 'Leaderboard', href: '/leaderboard' },
  };
  const initialTab = Object.keys(tabs).find(key => location.pathname === tabs[key].href);
  const [activeTab, setActiveTab] = useState(parseInt(initialTab) || 0);

  const handleOnChangeTab = (e, tab) => {
    setActiveTab(tab);
    navigate(tabs[tab].href);
  }

  const handleLogout = () => {
    dispatch(handleRemoveLoggedUser());
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Stack direction="row" {...centerContentProps} width="100%">
          <div style={{ width: 200 }}></div>
          <Tabs value={activeTab} onChange={handleOnChangeTab} aria-label="Navigation tabs">
            {Object.keys(tabs).map(key => (
              <Tab key={key} label={tabs[key].label} />
            ))}
          </Tabs>
          <Stack direction="row" {...centerContentProps} spacing={3} sx={{ width: 200 }}>
            <Stack direction="column" {...centerContentProps}>
              <p className="no-margin">{`Hi, ${loggedUser ? loggedUser.name : 'user'}!`}</p>
              <Link onClick={handleLogout} underline="none" className="logout">
                Logout
              </Link>
            </Stack>
            <Avatar src={loggedUser?.avatarURL} />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = ({ loggedUser }) => ({
  loggedUser,
});

export default connect(mapStateToProps)(Nav);