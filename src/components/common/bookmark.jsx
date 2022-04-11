import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ status, ...rest }) => {
  return (
    <button {...rest}>
      <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
    </button>
  );
};
BookMark.propTypes = {
  status: PropTypes.bool
};

export default BookMark;

// const BookMark = ({ status, onToggleBookmark, _id }) => {
//   if (status === "Marked") {
//     return (
//       <i
//         onClick={() => onToggleBookmark(_id, status)}
//         className="bi bi-bookmark-fill"
//       ></i>
//     );
//   } else
//     return (
//       <i
//         onClick={() => onToggleBookmark(_id, status)}
//         className="bi bi-bookmark"
//       ></i>
//     );
// };

// export default BookMark;
