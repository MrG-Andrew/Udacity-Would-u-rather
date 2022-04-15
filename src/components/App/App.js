import { useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import handleInitialData from '../../actions/shared';
import Nav from '../Navbar/Navbar';
import Home from '../Home/Home';
import Leaderboard from '../Leaderboard/Leaderboard';
import Login from '../Login/Login';
import NewQuestion from '../NewQuestion/NewQuestion';
import ZeroMatch from '../ZeroMatch/ZeroMatch';
import Poll from '../Poll/Poll';

const Routing = () => {
  const Routes = useRoutes([
    {
      path: '/', element: <Home />, children: [
        { path: 'poll/:id', element: <Poll /> },
      ]
    },
    { path: '/add', element: <NewQuestion /> },
    { path: '/leaderboard', element: <Leaderboard /> },
    { path: '/login', element: <Login /> },
    { path: '*', element: <ZeroMatch /> },
  ]);
  return Routes;
}

function App({ dispatch, loggedUser }) {
  useEffect(() => {
    function setUp() {
      dispatch(handleInitialData());
    }
    setUp();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app">
        <LoadingBar />
        {!!loggedUser && <Nav />}
        {!!loggedUser
          ? <Routing />
          : <Login />
        }
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = ({ loggedUser }) => ({
  loggedUser,
});

export default connect(mapStateToProps)(App);