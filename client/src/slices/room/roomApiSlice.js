import { apiSlice } from "../apiSlice";

const ROOMS_URL = "/api/rooms";

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    fetchRoomDetails: builder.query({
      query: (roomId) => `${ROOMS_URL}/${roomId}`,
    }),
    joinRoom: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/join`,
        method: "POST",
        body: data,
      }),
    }),
    leaveRoom: builder.mutation({
      query: (roomId) => ({
        url: `${ROOMS_URL}/${roomId}/leave`,
        method: "POST",
      }),
    }),
    updateRoomDetails: builder.mutation({
      query: (data) => ({
        url: `${ROOMS_URL}/${data.roomId}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useFetchRoomDetailsQuery,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useUpdateRoomDetailsMutation,
} = roomApiSlice;
