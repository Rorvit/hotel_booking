// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import QualitiesList from "../../ui/qualities";
// import Comments from "../../ui/comments"
// import Loader from "../../../utils/loader";
// import {Link, useParams} from "react-router-dom";
// import BookingForm from "../../ui/bookingForm"
// import { useSelector } from "react-redux";
// import { getRoomById } from "../../store/rooms";
// import {getIsLoggedIn} from "../../store/users";
// import history from "../../../utils/history";
// import RegisterForm from "../../ui/registerForm";
// import LoginForm from "../../ui/loginForm";
//
//
// const RoomPage = ({ roomId }) => {
//     const [showForm, setForm] = useState(false)
//     const toggleForm = (params) => {
//         setForm((prevState) =>
//             prevState === true ? false : true
//         );
//     };
//
//   const room = useSelector(getRoomById(roomId));
//   const isLoggedIn=useSelector(getIsLoggedIn())
//   const handleClick=()=>{
//        if (isLoggedIn ){
//            toggleForm()
//        } else{
//            history.push("/login")
//        }
//   }
//   useEffect(()=>{},[showForm])
//
//   if (room) {
//     return (
//       <>
//           <div className="container-md">
//               <div className="row gutters-sm">
//                   <div className="col-md-6 mb-3">
//                       <img src={room.photo} className="card-img-top" alt="..." />
//                   </div>
//                   <div className="col-md-6 ">
//                       <div className="card mb-3 ">
//                           <h5 className="card-title m-3">Номер {room.name}</h5>
//                           <p className="card-text m-3">
//                               Преимуществом этого номера является увеличенная до 20 м2 площадь. Во всех номерах белоснежные халаты и тапочки бесплатно и по умолчанию.
//                               Интерьер выполнен в приятных цветах и оттенках с элементами скандинавского стиля, а за счет больших окон в номерах много света.
//                           </p>
//                           <p className="card-text">
//                               <ul>
//                                   <li>Количество проживающих: {room.guests_count}</li>
//                                   <li>Дополнительные места: {room.guests_additionally}</li>
//                               </ul>
//                           </p>
//                       </div>
//                       <div className="card mb-3">
//                           <div className=" card-body d-flex flex-column justify-content-center text-center ">
//                               <p className="card-text">
//                                   <QualitiesList ids={room.qualities} />
//                               </p>
//                           </div>
//                       </div>
//                   </div>
//               </div>
//
//               <button className="btn btn-success btn-lg mb-3" onClick={handleClick}>{showForm?`Назад`:`Забронировать`}</button>
//               {showForm&&<BookingForm/>}
//
//               {/*{formType === "register" ? (*/}
//               {/*    <>*/}
//               {/*        <h3 className="mb-4">Registration</h3>*/}
//               {/*        <RegisterForm />*/}
//               {/*        <p>*/}
//               {/*            Already have account?{" "}*/}
//               {/*            <a role="button" onClick={toggleFormType}>*/}
//               {/*                Sign in*/}
//               {/*            </a>*/}
//               {/*        </p>*/}
//               {/*    </>*/}
//               {/*) : (*/}
//               {/*    <>*/}
//               {/*        <h3 className="mb-4">Login</h3>*/}
//               {/*        <LoginForm />*/}
//               {/*        <p>*/}
//               {/*            Dont have account?*/}
//               {/*            <a role="button" onClick={toggleFormType}>*/}
//               {/*                Registration*/}
//               {/*            </a>*/}
//               {/*        </p>*/}
//               {/*    </>*/}
//               {/*)}*/}
//
//               <div className="col-md-8">
//                   <Comments />
//               </div>
//           </div>
//
//
//
//         {/* <div className="col-md-8">
//           Комментарии
//           {rooms ? (
//             <CommentForm forId={roomId} rooms={rooms} add={addComment} />
//           ) : (
//             <Loader />
//           )}
//           {rooms && comments ? (
//             <Comments
//               roomId={room._id}
//               rooms={rooms}
//               commentsForroom={comments}
//               remove={removeComment}
//             />
//           ) : (
//             <Loader />
//           )}
//         </div> */}
//       </>
//     );
//   }
//   return <Loader />;
// };
//
// export default RoomPage;
// RoomPage.propTypes = {
//   roomId: PropTypes.string.isRequired,
//   rooms: PropTypes.array,
// };
