import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import MultiSelectField from "../common/form/multiSelectField";
import { useSelector, useDispatch } from "react-redux";
import { getQualities } from "../store/qualities";
import { getCategories } from "../store/categories";
import {createRoom} from "../store/rooms";

const RoomForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        number: "",
        category: "",
        photo: "",
        guests_count: "",
        guests_additionally: "",
        price: "",
        qualities:[],

    });

    const qualities = useSelector(getQualities());
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const categories = useSelector(getCategories());

    const categoriesList = categories.map((c) => ({
        label: c.name,
        value: c._id
    }));
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Название обязательно для заполнения"
            },
            min: {
                message: "Имя должено состоять минимум из 3 символов",
                value: 3
            }
        },

        category: {
            isRequired: {
                message: "Обязательно выберите категорию отеля"
            }
        },
        number: {
            isRequired: {
                message:
                    "У коттеджа/комнаты должен быть порядковый номер"
            }
        },
        guests_count:{
            isRequired: {message: "!!!!!!"}
        },
        guests_additionally: {
            isRequired: {message: "!!!!!!"}
        }
        // qualities:{
        //     isRequired: {message: "!!!!!!"}
        // }
    };

    // useEffect(() => {
    //     validate();
    // }, [data]);

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
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        dispatch(createRoom(newData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Название"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Номер"
                name="number"
                value={data.number}
                onChange={handleChange}
                error={errors.number}
            />
            <TextField
                label="ссылка на фото"
                name="photo"
                value={data.photo}
                onChange={handleChange}
                error={errors.photo}
            />
            <SelectField
                label="Категория номера"
                defaultOption="Choose..."
                name="category"
                options={categoriesList}
                onChange={handleChange}
                value={data.category}
                error={errors.category}
            />
            <TextField
                label="Количество мест в номере"
                name="guests_count"
                value={data.guests_count}
                onChange={handleChange}
                error={errors.guests_count}
            />
            <TextField
                label="Дополнительные спальные места в номере"
                name="guests_additionally"
                value={data.guests_additionally}
                onChange={handleChange}
                error={errors.guests_additionally}
            />
            <TextField
                label="Стоимость"
                name="price"
                value={data.price}
                onChange={handleChange}
                error={errors.price}
            />
            <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                name="qualities"
                label="Характеристики номера"
            />

            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default RoomForm;
