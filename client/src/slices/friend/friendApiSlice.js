// friendApiSlice.js
import { apiSlice } from "../apiSlice";

const FRIENDS_URL = "/api/friend-invitation";

export const friendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendFriendInvitation: builder.mutation({
      query: (data) => ({
        url: `${FRIENDS_URL}/invite`,
        method: "POST",
        body: data,
      }),
    }),
    acceptFriendInvitation: builder.mutation({
      query: (data) => ({
        url: `${FRIENDS_URL}/accept`,
        method: "POST",
        body: data,
      }),
    }),
    rejectFriendInvitation: builder.mutation({
      query: (data) => ({
        url: `${FRIENDS_URL}/reject`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSendFriendInvitationMutation,
  useAcceptFriendInvitationMutation,
  useRejectFriendInvitationMutation,
} = friendApiSlice;
