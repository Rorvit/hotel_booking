import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList,
} from "../../store/users";
import { loadQualitiesList } from "../../store/qualities";
import { loadCategoriesList } from "../../store/categories";
import { loadRoomsList } from "../../store/rooms";
import { loadBookingsListForRoom } from "../../store/bookings";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadCategoriesList());
    dispatch(loadRoomsList());
    dispatch(loadBookingsListForRoom());
    if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);
  if (usersStatusLoading) return "loading";
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default AppLoader;
