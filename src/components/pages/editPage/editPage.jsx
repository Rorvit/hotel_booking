import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EditPage = ({ userId }) => {
  const [user, setUser] = useState();
  if (user) {
    // return <EditForm user={user} />;
    return <p> EditForm</p>
  }
  return (
    <div className="spinner-border m-5" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default EditPage;
EditPage.propTypes = {
  userId: PropTypes.string.isRequired
};
