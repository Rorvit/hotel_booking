import React from "react";
import UserPage from "../components/pages/userPage";
import EditPage from "../components/pages/editPage";
import {Redirect, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCurrentUserId} from "../components/store/users";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());
  return (
      <>
          {userId ? (
              edit ? (
                  userId === currentUserId ? (
                      <EditPage />
                  ) : (
                      <Redirect to={`/users/${currentUserId}/edit`} />
                  )
              ) : (
                  <UserPage userId={userId} />
              )
          ) : (
              <p>users list page</p>
          )}
      </>
  );
};

export default Users;
