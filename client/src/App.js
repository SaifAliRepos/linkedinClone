import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import NavScrollExample from './components/Header/Navbar';
import { Introduction } from './components/Home/Introduction';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from 'react-redux';
import store from './store'
import AutohideToast from './components/Utils/Toast';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './reducers/authSlice';
import { useAuth } from './actions/auth';
import { PrivateRoutes } from './components/Routes/PrivateRoutes'
import { Posts } from './components/Posts/Posts';
import { Profiles } from './components/Profiles/Profiles';
import RegisterForm from './components/Users/RegisterForm';
import ViewProfile from './components/Profiles/ViewProfile';
import Network from './components/Users/Network';
import RecentActivity from './components/Profiles/RecentActivity';


function App() {

  const { auth } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    auth();

    window.addEventListener('storage', () => {
      if (!localStorage.token) dispatch(LOGOUT());
    });
  }, [auth, dispatch]);

  return (
    <div>
      <Provider store={store}>
        <Router>
          <NavScrollExample />
          <AutohideToast />
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profiles" element={<PrivateRoutes Component={Profiles} />} />
            <Route path="/my-network" element={<PrivateRoutes Component={Network} />} />
            <Route path="/profile/user/:user_id" element={<PrivateRoutes Component={ViewProfile} />} />
            <Route path="/profile/user/:user_id/recent_activity" element={<PrivateRoutes Component={RecentActivity} />} />
            <Route path="/posts" element={<PrivateRoutes Component={Posts} />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;