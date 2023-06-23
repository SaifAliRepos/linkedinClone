import { useDispatch } from "react-redux";
import { SET_AlERT } from "../reducers/alertSlice";
import { LOGOUT, REGISTER_SUCCESS, USER_LOADED } from "../reducers/authSlice";
import api from "../utils/api";
import setAuthToken from "../utils/setAuthToken";
const itn = require('../constants/constants.json')

export const useAuth = () => {
  const dispatch = useDispatch();

  const register = async (formData) => {
    try {
      const res = await api.post('/users/new', formData);
      dispatch(REGISTER_SUCCESS({ token: res.data.token }));
      return true

    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(SET_AlERT({ msg: error.msg })));
      }
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const body = { email, password };
      const res = await api.post('/auth/', body);
      dispatch(REGISTER_SUCCESS({ token: res.data.token }));
      dispatch(SET_AlERT({ msg: itn.SIGNIN }));
      return true;

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(SET_AlERT({ msg: error.msg })));
      }

      dispatch(LOGOUT());
      return false;
    }
  };

  const auth = async () => {
    try {
      setAuthToken(localStorage.getItem('token'));
      const res = await api.get('/auth/');
      dispatch(USER_LOADED(res.data));
      return true;

    } catch (err) {
      dispatch(LOGOUT());
      return false;
    }
  };

  return {
    register,
    login,
    auth
  };
};