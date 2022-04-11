import moment from "moment";
import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import GuestsField from "../common/form/guestsField";
import DateField from "../common/form/dateField";
import RoomsListPage from "../pages/roomsListPage/roomsListPage";
import history from "../../utils/history";

const DatesForm = () => {
  const [data, setData] = useState({
    checkin: moment().format("YYYY-MM-DD"),
    checkout: moment().add(1, "days").format("YYYY-MM-DD"),
    count: "2",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    localStorage.removeItem("rooms_search");
    console.log("target", target);
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
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    localStorage.setItem("rooms_search", JSON.stringify(data));
    history.push("/rooms")
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="justify-content-center">
          <div className="row g-10 justify-content-center">
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
          <div className="d-flex justify-content-center m-2">
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary"
            >
              Найти номер
            </button>
          </div>
        </div>
      </form>
    </>
  )}

export default DatesForm
