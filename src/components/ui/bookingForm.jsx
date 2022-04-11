import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserData} from "../store/users";
import {getRoomById} from "../store/rooms";
import DateField from "../common/form/dateField";
import moment from "moment";
import GuestsField from "../common/form/guestsField";
import {validator} from "../../utils/validator";
import history from "../../utils/history";
import {createBooking, getBookings, loadBookingsListForRoom} from "../store/bookings"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {
    const dispatch=useDispatch()
    const {roomId}=useParams()
    const room=useSelector(getRoomById(roomId))
    const currentUser = useSelector(getCurrentUserData());
    console.log('currentUser ', currentUser)
    const roomBookings=useSelector(loadBookingsListForRoom(roomId))
    console.log('roomBookings ', roomBookings)
    const [data, setData] = useState({
        roomId,
        checkin: moment().format("YYYY-MM-DD"),
        checkout: moment().add(1, "days").format("YYYY-MM-DD"),
        count: "2",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validatorConfig = {
        checkin: {},
        checkout: {
            afterCheckin: { message: "Дата выезда должна быть позже заезда" },
        },
        count: {
            // isEmail: { message: "!!!!!!!!!!!!!!!!!!!!!!" },
            isNumber: {
                message: "Введите целое число",
            },
            isUnderLimit: {
                message: "Количество гостей в номере от 1 до 30",
            },
        },
    };

    useEffect(() => validate(), [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const checkRoomForBooking=(roomId, dateIn,dateOut)=>{

        // const roomBookings=loadBookingsListForRoom(roomId)
        console.log('roomBookings ', roomBookings)
        return roomBookings.every(
            (booking) =>
                Date.parse(booking.checkin) >= Date.parse(dateOut) ||
                Date.parse(booking.checkout) <= Date.parse(dateIn)
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        if (Number(data.count)>Number(room.guests_count) + Number(room.guests_additionally)){
            toast.error("Вместимость номера меньше заявленного количества гостей")
            return;
        }
        const roomIsAvailable=checkRoomForBooking(data.roomId, data.checkin, data.checkout)
        console.log('roomIsAvailable ', roomIsAvailable)
        if (roomIsAvailable){
                dispatch(createBooking({ ...data}));

        }else{
            toast.error("Номер не может быть забронирован на эти даты");
        }
        history.push(`/users/${currentUser._id}`)
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card text-dark bg-light w-75">
                <div className="card-body">
                    <div className="card-text">
                        <p>Имя: {currentUser.name}</p>
                        <p>email: {currentUser.email}</p>
                        <p>Номер: {room.number}</p>
                        <p>Категория: {room.name}</p>
                    </div>
            <div className="row g-3">
            <DateField
                name="checkin"
                label="Заезд"
                type="date"
                value={data.checkin}
                onChange={handleChange}
                error={errors.checkin}
                min={moment().format().split("T")[0]}
            />

            <DateField
                name="checkout"
                label="Выезд"
                type="date"
                value={data.checkout}
                onChange={handleChange}
                error={errors.checkout}
                min={moment().add(1, "days").format().split("T")[0]}
            />


            <GuestsField
                name="count"
                value={data.count}
                onChange={handleChange}
                label="Кол-во гостей"
                error={errors.count}
                type="text"
            />
            </div>


            <button
                type="submit"
                className="btn btn-primary w-50 mx-auto m-3"
            >
                Забронировать
            </button>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
        </div>
    </form>

    );
};

export default BookingForm