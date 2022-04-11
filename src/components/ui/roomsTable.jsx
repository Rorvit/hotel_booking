import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import QualitiesList from "./qualities";
import { Link } from "react-router-dom";
import Table from "../common/table";
import Category from "./category";

const RoomsTable = ({
  rooms,
  onSort,
  selectedSort,
  onToggleBookmark,
  ...rest
}) => {
  const columns = {
    count: {},
    photo: {
      component: (room) => (
          <Link to={`/rooms/${room._id}`}>
            <img className="room-img" src={room.photo}/>
          </Link>
      ),
    },
    name: {
      path: "name",
      name: "Имя",
      component: (room) => <Link to={`/rooms/${room._id}`}>{room.name}</Link>,
    },
    number: {path: "number", name: "Number"},
    qualities: {
      name: "Качества",
      component: (room) => <QualitiesList ids={room.qualities}/>,
    },
    category: {
      name: "Категория",
      component: (room) => <Category id={room.category}/>
    },
    guests_count: {path: "guests_count", name: "Количество гостей"},
    guests_additionally: {
      path: "guests_additionally",
      name: "Дополнительное размещение",
    },
    rate: {path: "rate", name: "Оценка"},
    booking: {
      name: "Бронь",
      component: (room) => <Link to={`/rooms/${room._id}`}>Забронировать</Link>
    }
  }
  return (
    //
    //   <Table
    //     onSort={onSort}
    //     selectedSort={selectedSort}
    //     columns={columns}
    //     data={users}
    //   />
    //   {/* <TableHeader {...{ onSort, selectedSort, columns }} />
    //   <TableBody {...{ columns, data: users }} /> */}
    //

    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={rooms}
    />
  );
};
export default RoomsTable;
RoomsTable.propTypes = {
  rooms: PropTypes.array.isRequired,
  handleSort: PropTypes.func,
  selectedSort: PropTypes.object,
  onSort: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func,
};
