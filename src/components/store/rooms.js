import {createAction, createSlice} from "@reduxjs/toolkit";
import roomService from "../../services/room.service";
import localStorageService from "../../services/localStorage.service";
import history from "../../utils/history";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
      lastFetch: null,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
      lastFetch: null,
    };
const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    roomsRequested: (state) => {
      state.isLoading = true;
    },
    roomsReceved: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    roomsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    roomCreated: (state, action) => {
       state.entities.push(action.payload);
    },
    roomRemoved: (state, action) => {
       state.entities = state.entities.filter((r) => r._id !== action.payload);
    },
    roomUpdateSuccessed: (state, action) => {
       state.entities[
           state.entities.findIndex((r) => r._id === action.payload._id)
           ] = action.payload;
    },
  },
});

const { reducer: roomsReducer, actions } = roomsSlice;
const { roomsRequested, roomsReceved, roomsRequestFailed, roomCreated, roomRemoved, roomUpdateSuccessed } = actions;

const addRoomRequested = createAction("rooms/addRoomRequested");
const removeRoomRequested = createAction("rooms/removeRoomRequested");

const roomUpdateFailed = createAction("users/userUpdateFailed");
const roomUpdateRequested = createAction("users/userUpdateRequested");

export const loadRoomsList = () => async (dispatch) => {
  dispatch(roomsRequested());
  try {
    const { content } = await roomService.getRooms();
    dispatch(roomsReceved(content));
  } catch (error) {
    dispatch(roomsRequestFailed(error.message));
  }
};

export const getRoomsList = () => (state) => state.rooms.entities;

export const getRoomById = (roomId) => (state) => {
  if (state.rooms.entities) {
    return state.rooms.entities.find((r) => r._id === roomId);
  }
};

export const createRoom = (payload) => async (dispatch) => {
    console.log('room payload ', payload)
   dispatch(addRoomRequested());
   try {
      const data = await roomService.createRoom(payload);
      console.log('data after create room ',data)
      dispatch(roomCreated({ roomId: data.roomId }));
   } catch (error) {
      dispatch(roomsRequestFailed(error.message));
   }
};
export const removeRoom = (roomId) => async (dispatch) => {
    dispatch(removeRoomRequested());
    try {
        const { content } = await roomService.removeRoom(roomId);
        if (!content) {
            dispatch(roomRemoved(roomId));
        }
    } catch (error) {
        dispatch(roomsRequestFailed(error.message));
    }
};

export const updateRoom = (payload) => async (dispatch) => {
    dispatch(roomUpdateRequested());
    try {
        const { content } = await roomService.update(payload);
        dispatch(roomUpdateSuccessed(content));
        history.push(`/rooms/${content._id}`);
    } catch (error) {
        dispatch(roomUpdateFailed(error.message));
    }
};

export default roomsReducer;
