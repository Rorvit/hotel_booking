import httpService from "./http.service";

const adminEndpoint = 'admin/'

const adminService = {
    get: async () => {
        const { data } = await httpService.get(adminEndpoint)
        return data
    },
    removeRoom: async (roomId) => {
        const data = await httpService.delete(adminEndpoint + 'deleteroom/' + roomId)
        return data
    },
    updateRoom: async (id, payload) => {
        const data = await httpService.post(adminEndpoint + 'updateroom', {
            id,
            payload
        })
        return data
    },

    createRoom: async (payload) => {
        const {data} = await httpService.post(adminEndpoint+ 'createroom', payload);
        return data;
    }
}

export default adminService