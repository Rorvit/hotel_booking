// import httpService from "./http.service";
//
// const roomEndpoint = "room/";
//
// const roomService = {
//   getRooms: async () => {
//     const { data } = await httpService.get(roomEndpoint);
//     return data;
//   },
//   createRoom: async (payload) => {
//     const { data } = await httpService.post(roomEndpoint, payload);
//     return data;
//   },
//   updateRoom: async (payload) => {
//     const { data } = await httpService.patch(
//       roomEndpoint +  payload._id,
//       payload
//     );
//     return data;
//   },
//   removeRoom: async (roomId) => {
//     const { data } = await httpService.delete(roomEndpoint + roomId);
//     return data;
//   },
// };
// export default roomService;
