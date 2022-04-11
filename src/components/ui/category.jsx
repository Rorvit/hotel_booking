import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getCategoryById,
    getCategoriesLoadingStatus
} from "../store/categories";

const Category = ({ id }) => {
    const isLoading = useSelector(getCategoriesLoadingStatus());
    const category = useSelector(getCategoryById(id));
    if (!isLoading) {
        return <p>{category.name}</p>;
    } else return "loading ...";
};
Category.propTypes = {
    id: PropTypes.string
};
export default Category;
