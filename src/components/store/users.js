import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import localStorageService from "../../services/localStorage.service";
import userService from "../../services/user.service";
import { generetaAuthError } from "../../utils/generateAuthError";
import history from "../../utils/history";
import jwt_decode from "jwt-decode";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { ...JSON.parse(localStorageService.getUser()) },
      isLoggedIn: true,
      dataLoaded: false,
      // isAdmin: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
      // isAdmin: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      console.log("action.payload ", action.payload);
      // state.isAdmin = action.payload.role === "ADMIN";
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
    authReceived(state, action) {
      state.auth = action.payload;
      // state.isAdmin = action.payload.role.includes( "ADMIN" );
      state.isLoggedIn = true;
      state.isLoading = false;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceved,
  userCreated,
  usersRequestFiled,
  authRequestFailed,
  authRequestSuccess,
  userLoggedOut,
  userUpdateSuccessed,
  authReceived,
} = actions;

const authRequested = createAction("users/authRequested");

const userUpdateFailed = createAction("users/userUpdateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");

export const login =
  ({ payload, redirect }) =>
  async (dispatch) => {
  console.log('payload,redirect: ',payload,redirect)
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      const { accessToken } = data;
      const user = jwt_decode(accessToken);
      localStorageService.setTokens(data);
      localStorageService.setUser(user)
      dispatch(authRequestSuccess(user));
      history.push("/");
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generetaAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    console.log('signUp dta response ', data)
    const {accessToken}=data
    const user = jwt_decode(accessToken)
    console.log('user in sign up ', user)
    localStorageService.setTokens(data);
    localStorageService.setUser(user)

    dispatch(authReceived(user));
    history.push("rooms/");
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};
export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    dispatch(userUpdateSuccessed(content));
    history.push(`/users/${content._id}`);
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const getUsersList = () => (state) => state.users.entities;
export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth._id)
    : null;
};
export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
// export const getIsAdmin = () => (state) => state.users.auth?.role.includes('ADMIN');
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.error;
export default usersReducer;
