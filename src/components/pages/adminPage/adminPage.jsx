import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {getCurrentUserData, getCurrentUserId, getUserById} from "../../store/users";
import {getRoomsList} from "../../store/rooms";
import moment from "moment";
import DateField from "../../common/form/dateField";
import RoomForm from "../../ui/roomForm";
import AdminRoomsList from "../../ui/adminRoomsList";

const AdminPage = () => {
  const admin = useSelector(getCurrentUserData());
  const rooms=useSelector(getRoomsList())

  const [queryDate, setDate] = useState( moment().format("YYYY-MM-DD"));
  const handleChange = (target) => {
        // setDate((prevState) => ({ ...prevState, [target.name]: target.value }));
      setDate(  target.value );
  };
// useEffect(()=>{
//     setDate(queryDate)
// },[queryDate])

console.log('rooms ',rooms)
  if (rooms) {
    return (
        <div className="container-fluid ">
            <div className="row g-10 justify-content-center">
            <DateField
                className=""
                name="queryDate"
                label="На дату"
                type="date"
                value={queryDate}
                onChange={handleChange}
                min={moment().format().split("T")[0]}
            />
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">


            {/*<div className="container">*/}
            {/*    <div className="row row-cols-auto">*/}
            {/*        {rooms?rooms.map((r)=>{*/}
            {/*        <div className={'col bg'+`${getRoomStatus(r._id)}`}>*/}
            {/*            {r.number}*/}
            {/*        </div>}):''*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}
            <AdminRoomsList
                rooms={rooms}
                queryDate={queryDate}
            />
            <RoomForm/>

                </div>
            </div>
        </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};



export default AdminPage;
