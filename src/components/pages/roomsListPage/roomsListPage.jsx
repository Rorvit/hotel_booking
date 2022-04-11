// import React, { useState, useEffect } from "react";
// import Pagination from "../../common/pagination";
// import { paginate } from "../../../utils/paginate";
// import GroupList from "../../common/groupList";
// import PropTypes from "prop-types";
// import RoomsTable from "../../ui/roomsTable";
// import DatesForm from "../../ui/datesForm"
// import _ from "lodash";
// import Loader from "../../../utils/loader";
// import Search from "../../common/form/search";
// import {getCategories,
//   getCategoriesLoadingStatus
// } from "../../store/categories";
// import { useSelector } from "react-redux";
// import {getRoomsList } from "../../store/rooms";
//
//
// const RoomsListPage = () => {
//   const rooms=useSelector(getRoomsList());
//   const categories=useSelector(getCategories());
//   const categoriesLoading=useSelector(getCategoriesLoadingStatus())
//
//   const [selectedCategory, setSelectedCategory] = useState();
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 5;
//   const [sortBy, setSortBy] = useState({ path: "price", order: "asc" });
//   const [searchingName, setSearchingName] = useState( "" );
//
//   let roomsCrop=[]
//
//   const handleToggleBookMark = (id) => {
//     const newArray = rooms.map((room) => {
//       if (room._id === id) {
//         return { ...room, bookmark: !room.bookmark };
//       }
//       return room;
//     });
//   };
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedCategory,searchingName]);
//   const handleCategorySelect = (item) => {
//     if (searchingName !== "") setSearchingName("");
//     setSelectedCategory(item);
//   };
//   const handleSearchChange = ({ target }) => {
//     setSelectedCategory(undefined);
//     setSearchingName(target.value);
//   };
//   const handlePageChange = (pageIndex) => {
//     setCurrentPage(pageIndex);
//   };
//   const handleSort = (item) => {
//     setSortBy(item);
//   };
//
//   function filterRooms(data) {
//     return  searchingName
//         ? data.filter(
//             (room) =>
//                 room.name
//                     .toLowerCase()
//                     .indexOf(searchingName.toLowerCase()) !== -1
//         )
//         : selectedCategory
//             ? data.filter((room) => room.category === selectedCategory._id)
//             : data;
//   }
//
//   const filteredRooms=filterRooms(rooms)
//   const count = filteredRooms.length
//   roomsCrop=paginate(filterRooms(rooms),currentPage,pageSize)
//
//   // if (rooms&&localStorage.getItem("rooms_search")) {
//   //   const roomsSearch = JSON.parse(localStorage.getItem("rooms_search"));
//   //   let filteredRoomsByCount = rooms?.filter(
//   //         (room) =>
//   //           Number(room.guests_count) + Number(room.guests_additionally) >=
//   //           roomsSearch.count
//   //         );
//   //   const roomsForBooking = filteredRoomsByCount.filter((room) =>
//   //       room.bookings?.every(
//   //           (booking) =>
//   //           Date.parse(booking.checkin) >= Date.parse(roomsSearch.checkout) ||
//   //           Date.parse(booking.checkout) <= Date.parse(roomsSearch.checkin)
//   //         )
//   //       );
//   //   // roomsCrop=paginate(filterRooms(roomsForBooking),currentPage,pageSize)
//   //   filteredRooms=filterRooms(roomsForBooking)
//   //
//   // } else {
//   //   const filteredRooms=filterRooms(rooms)
//   //   // roomsCrop=paginate(filterRooms(rooms),currentPage,pageSize)
//   // }
//
//
//
//   // const count = roomsCrop.length;
//   const clearFilter = () => {
//     setSelectedCategory();
//   };
//
//   return (rooms?
//       <>
//         <DatesForm/>
//         {localStorage.getItem("rooms_search")&&<h3>Свободные номера на ваши даты </h3>}
//       <div className="d-flex">
//
//         {categories && !categoriesLoading && (
//             <div className="d-flex flex-column flex-shrink-0 p-3">
//               <GroupList
//                   items={categories}
//                   onItemSelect={handleCategorySelect}
//                   selectedItem={selectedCategory}
//               />
//               <button
//                   className="btn btn-secondary mt-2"
//                   onClick={clearFilter}
//               >
//                 Очистить
//               </button>
//             </div>
//         )}
//         <div className="d-flex flex-column">
//           {/*<Search length={count} />*/}
//
//           <input
//               type="text"
//               name="searchingName"
//               placeholder="Search..."
//               onChange={handleSearchChange}
//               value={searchingName}
//           />
//           {count > 0 && (
//               <RoomsTable
//                   rooms={roomsCrop}
//                   onSort={handleSort}
//                   selectedSort={sortBy}
//                   onToggleBookMark={handleToggleBookMark}
//               />
//           )}
//           <div className="d-flex justify-content-center">
//             <Pagination
//                 itemsCount={count}
//                 pageSize={pageSize}
//                 currentPage={currentPage}
//                 onPageChange={handlePageChange}
//             />
//           </div>
//         </div>
//       </div>
//       </>:<Loader/>
//   );
// };
//
//
// RoomsListPage.propTypes = {
//   rooms: PropTypes.array,
//   index: PropTypes.number,
// };
//
// export default RoomsListPage;
