import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radioField";
import CheckBoxField from "../common/form/checkBoxField";
import {  useDispatch } from "react-redux";
import { signUp } from "../store/users";

const RegisterForm = () => {
    const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    name:'',
    sex: "male",
    license: false
  });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Введите корректный email" }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен включать хотя бы 1 заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен включать хотя бы 1 цифру"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
      name: {
          isRequired: {
              message: "Имя обязательно для заполнения"
          },
          min: {
              message: "Имя должено состаять миниму из 3 символов",
              value: 3
          }
      },
    license: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
    }
  };

  useEffect(() => {
      validate()
  }, [data]);

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
      const newData = {...data};
      dispatch(signUp(newData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="введите емаил"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="введите пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
        <TextField
            label="Имя"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={errors.name}
        />
      <RadioField
        options={[
          { name: "Female", value: "female" },
          { name: "male", value: "male" },
          { name: "other", value: "other" }
        ]}
        name="sex"
        onChange={handleChange}
        value={data.sex}
        label="Ваш пол"
      />

      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;
