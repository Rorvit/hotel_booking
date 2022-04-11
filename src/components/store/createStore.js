import commentsReducer from "./comments";
import categoriesReducer from "./categories";
import qualitiesReducer from "./qualities";
import usersReducer from "./users";
import roomsReducer from "./rooms";
import bookingsReducer from "./bookings";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  categories: categoriesReducer,
  rooms: roomsReducer,
  users: usersReducer,
  comments: commentsReducer,
  bookings: bookingsReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
