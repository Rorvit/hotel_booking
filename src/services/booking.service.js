import httpServices from "./http.service";
const bookingEndPoint = "booking/";

const bookingService = {
  createBooking: async (payload) => {
    const { data } = await httpServices.post(bookingEndPoint, payload);
    return data;
  },
  getBookingsForRoom: async (roomId) => {
    const { data } = await httpServices.get(bookingEndPoint, {
      params: {
        orderBy: "roomId",
        equalTo: `${roomId}`,
      },
    });
    return data;
  },

  getBookingsForUser: async (userId) => {
    const { data } = await httpServices.get(bookingEndPoint, {
      params: {
        orderBy: "userId",
        equalTo: `${userId}`,
      },
    });
    return data;
  },
  removeBooking: async (bookingId) => {
    const { data } = await httpServices.delete(bookingEndPoint + bookingId);
    return data;
  },
};
export default bookingService;
